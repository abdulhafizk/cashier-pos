import React, { useEffect, useState } from "react";
import GlobalDataProvider from "../components/GlobalDataProvider";
import CategoryCard from "../components/CategoryCard";
import Head from "next/head";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";
import numeral from "numeral";

export default function Exports() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // data restore variable
  const [itemsPreview, setItemsPreview] = useState([]);
  const [categoriesPreview, setCategoriesPreview] = useState([]);

  function constructor() {
    let history = JSON.parse(window.localStorage.getItem("history")) || [];
    setHistory(history);
    let items = JSON.parse(window.localStorage.getItem("items")) || [];
    setItems(items);
    let categories =
      JSON.parse(window.localStorage.getItem("categories")) || [];
    setCategories(categories);
  }

  useEffect(() => {
    constructor();
  }, []);

  // Convert items json to string for xlsx
  function historyItemStringify() {
    let newHistory = [];
    for (let i = 0; i < history.length; i++) {
      let arr = history[i];
      let items = "";
      arr.items.forEach(
        (element) => (items = items + element.item + " x" + element.qty + ", ")
      );
      arr = {
        ...arr,
        items,
      };
      newHistory.push(arr);
    }
    return newHistory;
  }

  function downloadExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const date = new Date().toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const fileName = "CookiePOS History " + date + ".xlsx";
    XLSX.writeFile(workbook, fileName);
  }

  function downloadJson(data, title) {
    const date = new Date().toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const fileName = title + " " + date + ".json";
    const jsonStr = JSON.stringify(data);
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr)
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    window.localStorage.setItem("backup", "ok");
  }

  // Read json files
  function handleFile(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    setItemsPreview(obj.items);
    setCategoriesPreview(obj.categories);
  }

  // Read xlsx files
  function handleXlsxFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setItemsPreview(json);
    };
    reader.readAsArrayBuffer(file);
  }

  function restore() {
    window.localStorage.setItem(
      "categories",
      JSON.stringify(categoriesPreview)
    );
    window.localStorage.setItem("items", JSON.stringify(itemsPreview));
    router.push("items");
  }

  function downloadSampleXlsx() {
    const sampleData = [
      {
        id: 1,
        item: "Sample Item 1",
        category: "Sample Category 1",
        stock: 100,
        price: 10000,
      },
      {
        id: 2,
        item: "Sample Item 2",
        category: "Sample Category 2",
        stock: 200,
        price: 20000,
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const fileName = "SampleData.xlsx";
    XLSX.writeFile(workbook, fileName);
  }

  return (
    <>
      <Head>
        <title>CookiePOS | Settings</title>
      </Head>
      <GlobalDataProvider>
        <div>
          <div className="flex flex-col lg:w-[80vw] h-full">
            <h1 className="text-xl font-bold text-base-content pt-6 pl-6 pb-6">
              Categories & Items
            </h1>

            <div className="flex flex-col ml-4 space-y-2">
              <button
                onClick={() =>
                  downloadJson({ categories, items }, "CookiePOS items")
                }
                className="btn btn-sm btn-success shadow-lg w-44 select-none hover:animate-pulse"
              >
                <span>Backup Data</span>
              </button>

              <input
                id="uploadItem"
                type="file"
                accept=".json"
                onChange={(event) => handleFile(event)}
                className="hidden"
              />
              <label
                htmlFor="uploadItem"
                className="btn btn-sm btn-info shadow-lg w-44 select-none hover:animate-pulse"
              >
                Restore Data
              </label>

              <input
                id="uploadXlsxItem"
                type="file"
                accept=".xlsx"
                onChange={(event) => handleXlsxFile(event)}
                className="hidden"
              />
              <label
                htmlFor="uploadXlsxItem"
                className="btn btn-sm btn-info shadow-lg w-44 select-none hover:animate-pulse"
              >
                Import Data .XLSX
              </label>

              <button
                onClick={() => downloadSampleXlsx()}
                className="btn btn-sm btn-info shadow-lg w-44 select-none hover:animate-pulse"
              >
                <span>Download Sample XLSX</span>
              </button>

              {(categoriesPreview?.length > 0 || itemsPreview?.length > 0) && (
                <div className="border border-error border-dashed max-w-2xl rounded-lg mr-4 mb-2">
                  <div className="flex flex-wrap mt-4 px-2">
                    {categoriesPreview.map((obj) => (
                      <CategoryCard key={obj.id} title={obj.category} />
                    ))}
                  </div>

                  <div className="overflow-x-auto mx-4 mb-4">
                    <table className="table table-zebra table-compact mt-4 overflow-scroll">
                      <thead>
                        <tr>
                          <th className="w-24">id</th>
                          <th className="w-36">Name</th>
                          <th className="w-36">Category</th>
                          <th className="w-24">Stock</th>
                          <th className="w-24">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsPreview?.map((obj) => (
                          <tr
                            key={obj.id}
                            className="group hover:text-accent cursor-pointer"
                          >
                            <td>{obj.id}</td>
                            <td>{obj.item}</td>
                            <td>{JSON.parse(obj.category).category}</td>
                            <td>{obj.stock}</td>
                            <td>{numeral(obj.price).format("0,0")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap justify-end items-center mt-8 mx-4 mb-4 space-x-2">
                    <b className="font-semibold text-sm md:text-lg my-2">
                      Previous items & categories will be deleted!
                    </b>
                    <button
                      onClick={() => {
                        setCategoriesPreview([]);
                        setItemsPreview([]);
                      }}
                      className="btn btn-sm btn-error shadow-lg w-24 select-none hover:animate-pulse"
                    >
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={() => restore()}
                      className="btn btn-sm btn-success shadow-lg w-24 select-none hover:animate-pulse"
                    >
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:w-[80vw] h-full">
            <h1 className="text-xl font-bold text-base-content pt-6 pl-6 pb-6">
              Sales History
            </h1>
            <div className="ml-4">
              <button
                onClick={() => downloadExcel(historyItemStringify())}
                className="btn btn-sm btn-success shadow-lg w-44 select-none hover:animate-pulse"
              >
                <span>Download .xlsx</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:w-[80vw] h-full">
            <h1 className="text-xl font-bold text-base-content pt-6 pl-6 pb-6">
              General Settings
            </h1>
            <div className="ml-4">
              <button
                onClick={() => {
                  if (confirm("Delete items & categories?")) {
                    window.localStorage.setItem("items", "[]");
                    window.localStorage.setItem("categories", "[]");
                    router.push("items");
                  }
                }}
                className="btn btn-sm btn-error shadow-lg w-44 select-none hover:animate-pulse"
              >
                <span>Delete All Data</span>
              </button>
              <a
                href="https://github.com/abdulhafizk/cashier-pos/issues"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-error shadow-lg mb-2 ml-4 w-44 select-none hover:animate-pulse"
              >
                <span>Report Issue</span>
              </a>
            </div>
          </div>
        </div>
      </GlobalDataProvider>
    </>
  );
}
