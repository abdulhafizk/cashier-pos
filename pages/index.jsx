import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 200) {
                    return prevProgress + 1
                }
                clearInterval(interval)
                setTimeout(() => {
                    router.push('dashboard')
                }, 2000)
                return prevProgress
            })
        }, 200)
        return () => clearInterval(interval)
    }, [])

    return (
        // Style Lama
        <div className={styles.container}>
            <Head>
                <title>HK Mart</title>
                <meta name="description" content="free cashier app" />
            </Head>

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
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Go back home
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
        </div>
    )

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
}
