import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import styles from "./Common.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Main(props: any) {
    return (
        <>
            <Head>
                <title>Q - Get in line!</title>
            </Head>
            <div className={styles.body}>
                <Nav />
                <ToastContainer />
                <main className={styles.main}>{props.children}</main>
                <Footer />
            </div>
            <div id="modal"></div>
        </>
    );
}
