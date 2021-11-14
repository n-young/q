import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Nav from "../components/Nav";
import QueueList from "../components/queue/QueueList"


export default function Home() {
    return (
        <>
        <ToastContainer />
        <main>
            <Nav />
            <QueueList />
        </main>
        </>
    );
}
