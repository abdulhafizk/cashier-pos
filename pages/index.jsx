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

    //return ( // Style Lama
    // <div className={styles.container}>
    //     <Head>
    //         <title>HK Mart</title>
    //         <meta name="description" content="free cashier app" />
    //     </Head>

    //     <main className={styles.main}>
    //         <div className={styles.loadingContainer}>
    //             <h1 className={styles.title}>
    //                 Point of Sale Cashier Application
    //             </h1>
    //             <div className="progress">
    //                 <div
    //                     className="progress-bar"
    //                     role="progressbar"
    //                     style={{ width: `${progress}%` }}
    //                     aria-valuenow={progress}
    //                     aria-valuemin="0"
    //                     aria-valuemax="100"
    //                 ></div>
    //             </div>
    //         </div>
    //     </main>
    // </div>
    //)

    // return (
    //     // Style Baru V2
    //     <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
    //         <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
    //         <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
    //         <div className="mx-auto max-w-2xl lg:max-w-4xl">
    //             <img
    //                 alt=""
    //                 src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg"
    //                 className="mx-auto h-12"
    //             />
    //             <figure className="mt-10">
    //                 <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
    //                     <p>
    //                         “Lorem ipsum dolor sit amet consectetur adipisicing
    //                         elit. Nemo expedita voluptas culpa sapiente alias
    //                         molestiae. Numquam corrupti in laborum sed rerum et
    //                         corporis.”
    //                     </p>
    //                 </blockquote>
    //                 <figcaption className="mt-10">
    //                     <img
    //                         alt=""
    //                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                         className="mx-auto h-10 w-10 rounded-full"
    //                     />
    //                     <div className="mt-4 flex items-center justify-center space-x-3 text-base">
    //                         <div className="font-semibold text-gray-900">
    //                             Judith Black
    //                         </div>
    //                         <svg
    //                             width={3}
    //                             height={3}
    //                             viewBox="0 0 2 2"
    //                             aria-hidden="true"
    //                             className="fill-gray-900"
    //                         >
    //                             <circle r={1} cx={1} cy={1} />
    //                         </svg>
    //                         <div className="text-gray-600">
    //                             CEO of Workcation
    //                         </div>
    //                     </div>
    //                 </figcaption>
    //             </figure>
    //         </div>
    //     </section>
    // )

    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">
                        404
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="https://github.com/abdulhafizk/cashier-pos">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="mr-2 bi bi-github"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            GitHub
                        </a>
                        <a
                            href="#"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Contact support{' '}
                            <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}
