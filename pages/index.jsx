import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
    const router = useRouter()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 1
                }
                clearInterval(interval)
                setTimeout(() => {
                    router.push('dashboard')
                }, 1000)
                return prevProgress
            })
        }, 100)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>HK Mart</title>
                <meta name="description" content="free cashier app" />
            </Head>

            <main className={styles.main}>
                <div className={styles.loadingContainer}>
                    <div className="progress">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <h1 className={styles.title}>
                        Point of Sale Cashier Application
                    </h1>
                </div>
            </main>
        </div>
    )
}
