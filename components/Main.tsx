import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import styles from "./Components.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Main(props: any) {
    return (
        <>
            <Head>
                <title>Q - Get in line!</title>
            </Head>
            <div className={styles.flexer}>
                <Nav />
                <ToastContainer />
                <main className={styles.main}>{props.children}</main>
                <Footer />
            </div>
        </>
    );
}
