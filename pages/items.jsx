import React, { useEffect, useState } from "react";
import GlobalDataProvider from "../components/GlobalDataProvider";
import CategoryCard from "../components/CategoryCard";
import Head from "next/head";
import { nanoid } from "nanoid";

export default function Items() {
  const [viewType, setViewType] = useState(true);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [itemUpdateModal, setItemUpdateModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: "",
    callback: null,
  });
  const [users, setUsers] = useState([]);
  const [userModal, setUserModal] = useState(false);

  const initialCategoryForm = {
    id: nanoid(6),
    category: "",
    icon: "default",
  };
  const [categoryForm, setCategoryForm] = useState(initialCategoryForm);

  const uncategorized = {
    id: null,
    category: "Uncategorized",
    icon: "default",
  };
  const initialItemForm = {
    id: nanoid(6),
    item: "",
    price: "",
    stock: "",
    category: JSON.stringify(uncategorized),
  };
  const [itemForm, setItemForm] = useState(initialItemForm);
  const [updateItemForm, setUpdateItemForm] = useState(initialItemForm);

  const initialUserForm = {
    id: nanoid(6),
    name: "",
    role: "",
  };
  const [userForm, setUserForm] = useState(initialUserForm);

  function constructor() {
    try {
      let categories = window.localStorage.getItem("categories");
      categories = JSON.parse(categories) || [];
      setCategories(categories);

      let items = window.localStorage.getItem("items");
      items = JSON.parse(items) || [];
      setItems(items);

      let users = window.localStorage.getItem("users");
      users = JSON.parse(users) || [];
      setUsers(users);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }
  useEffect(() => {
    constructor();
  }, []);

  // Form handler
  function handleCategoryChange(event) {
    const { name, value } = event.target;
    setCategoryForm((prevCategoryForm) => {
      return {
        ...prevCategoryForm,
        [name]: value,
      };
    });
  }
  function handleItemChange(event) {
    const { name, value } = event.target;
    setItemForm((prevItemForm) => {
      return {
        ...prevItemForm,
        [name]: value,
      };
    });
  }
  function handleItemUpdateChange(event) {
    const { name, value } = event.target;
    setUpdateItemForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleUserChange(event) {
    const { name, value } = event.target;
    setUserForm((prevUserForm) => {
      return {
        ...prevUserForm,
        [name]: value,
      };
    });
  }

  // Data handler
  function categorySubmit(event) {
    event.preventDefault();
    try {
      let newCategory = [...categories];
      newCategory.unshift(categoryForm);
      newCategory = JSON.stringify(newCategory);
      window.localStorage.setItem("categories", newCategory);
      setCategoryForm(initialCategoryForm);
      setCategoryModal((prev) => !prev);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  }
  function categoryDelete(id) {
    try {
      let newItems = [];
      for (let i = 0; i < items.length; i++) {
        let sample = items[i];
        if (JSON.parse(sample.category).id === id) {
          newItems.push({ ...sample, category: JSON.stringify(uncategorized) });
        } else {
          newItems.push({ ...sample });
        }
      }
      setItems(newItems);
      newItems = JSON.stringify(newItems);
      window.localStorage.setItem("items", newItems);

      let newCategory = categories.filter((cat) => cat.id !== id);
      newCategory = JSON.stringify(newCategory);
      window.localStorage.setItem("categories", newCategory);
      constructor();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
  function itemSubmit(event) {
    event.preventDefault();
    try {
      let newItem = [...items];
      newItem.unshift(itemForm);
      newItem = JSON.stringify(newItem);
      window.localStorage.setItem("items", newItem);
      setItemForm(initialItemForm);
      setItemModal((prev) => !prev);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  }
  function itemUpdate(event) {
    event.preventDefault();
    try {
      let newItems = [];
      let updateItem = updateItemForm;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id !== updateItem.id) {
          newItems.push(items[i]);
        } else {
          newItems.push(updateItem);
        }
      }
      window.localStorage.setItem("items", JSON.stringify(newItems));
      constructor();
      setItemUpdateModal((prev) => !prev);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }
  function itemDelete(id) {
    try {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      window.localStorage.setItem("items", JSON.stringify(newItems));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
  function openItemUpdate(obj) {
    setItemUpdateModal((prev) => !prev);
    setUpdateItemForm(obj);
  }

  function userSubmit(event) {
    event.preventDefault();
    try {
      let newUser = [...users];
      newUser.unshift(userForm);
      newUser = JSON.stringify(newUser);
      window.localStorage.setItem("users", newUser);
      setUserForm(initialUserForm);
      setUserModal((prev) => !prev);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  function confirm(message, callback) {
    if (callback == null) {
      callback = () => {
        return 0;
      };
    }
    if (message == null) {
      message = "Confirm action";
    }
    setConfirmModal((prev) => {
      return { isOpen: !prev.isOpen, message, callback };
    });
  }

  const categoryList = categories?.map((cat) => (
    <CategoryCard
      key={cat.id}
      title={cat.category}
      id={cat.id}
      categoryDelete={categoryDelete}
    />
  ));

  return (
    <>
      <Head>
        <title>CookiePOS | Items</title>
      </Head>
      <GlobalDataProvider>
        {/* ... (rest of the code remains unchanged) ... */}

        <h1 className="text-xl font-bold text-base-content pl-6 pb-2 pt-4">
          Users
        </h1>

        <div className="ml-4 mt-4">
          <label
            onClick={() => setUserModal((prev) => !prev)}
            className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse"
          >
            <span>+ Add User</span>
          </label>
        </div>

        {/* ... (rest of the code remains unchanged) ... */}

        {/* user modal */}
        <div
          className={`modal modal-bottom sm:modal-middle ${
            userModal && "modal-open"
          }`}
        >
          <div className="modal-box relative">
            <form onSubmit={userSubmit}>
              <h3 className="font-bold text-lg">Add new user</h3>
              <div className="divider"></div>

              <div className="form-control w-full max-w-xs mb-2">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={userForm.name}
                  onChange={(event) => handleUserChange(event)}
                  placeholder="e.g. John Doe"
                  className="input input-bordered text-base w-full max-w-xs"
                  required
                />
              </div>

              <div className="form-control w-full max-w-xs mb-8">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={(event) => handleUserChange(event)}
                  name="role"
                  value={userForm.role}
                  required
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="cashier">Cashier</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className="modal-action">
                <label
                  htmlFor="user-modal"
                  className="btn bg-none"
                  onClick={() => setUserModal((prev) => !prev)}
                >
                  Cancel
                </label>
                <button className="btn btn-success">Save</button>
              </div>
            </form>
          </div>
        </div>

        {/* ... (rest of the code remains unchanged) ... */}
      </GlobalDataProvider>
    </>
  );
}
