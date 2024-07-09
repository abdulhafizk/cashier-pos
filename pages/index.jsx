import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('dashboard')
        }, 20000)
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>HK Mart</title>
                <meta name="description" content="free cashier app" />
            </Head>

            <main className={styles.main}>
                <div className={styles.loadingContainer}>
                    <Image
                        src="/loading.gif"
                        alt="Loading"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <h1 className={styles.title}>
                    Point of Sale Cashier Application
                </h1>
            </main>
        </div>
    )
}
