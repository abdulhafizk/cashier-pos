// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export default function Home() {
//   const router = useRouter();
//   useEffect(() => {
//     router.push("dashboard");
//   }, []);
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>HK Mart</title>
//         <meta name="description" content="free cashier app" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Loading dashboard...</h1>
//       </main>
//     </div>
//   );
// }

import React from 'react'
import './App.css'
import welcomeImage from './welcome.png' // Make sure the image is in the src folder

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={welcomeImage} className="App-logo" alt="welcome" />
                <p className="App-greeting">السلام عليكم ورحمة الله وبركاته</p>
                <h1 className="App-title">
                    Welcome to
                    <br />
                    Point of Sale Cashier Application
                </h1>
            </header>
        </div>
    )
}

export default App
