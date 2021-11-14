import React from "react"
import { useRouter } from 'next/router'
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/components/Nav.module.css";
import { auth } from "../util/firebase";
import { SignIn, SignOut } from "./Auth";

export default function Nav() {
    const [user] = useAuthState(auth);
    const router = useRouter()

    return (
        <div className={styles.nav}>
            <div className={styles.navHolder}>
            <h1 onClick={() => router.push("/")}>Q</h1>
            {user ? <SignOut/> : <SignIn/>}
            </div>
        </div>
    )
}