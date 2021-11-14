import React from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Components.module.css";
import { auth } from "../util/firebase";
import { SignIn, SignOut } from "./Auth";

export default function Nav() {
    const [user] = useAuthState(auth);
    const router = useRouter()

    return (
        <>
        <Head>
            <title>
                Q - Get in line!
            </title>
        </Head>
        <div className={styles.nav}>
            <div className={styles.navHolder}>
            <h1 className={styles.icon} onClick={() => router.push("/")}>Q</h1>
            {user ? <SignOut/> : <SignIn/>}
            </div>
        </div>
        </>
    )
}