import React from "react";
import Nav from "./Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Main(props: any) {
    return (
        <>
            <Nav />
            <ToastContainer />
            <main>{props.children}</main>
        </>
    );
}
