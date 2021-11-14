import React from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/components/Nav.module.css";
import { auth } from "../util/firebase";
import { SignIn, SignOut } from "./Auth";

export default function Nav() {
    const [user] = useAuthState(auth);

    return (
        <div className={styles.nav}>
            <h1>Q</h1>
            {user ? <SignOut/> : <SignIn/>}
        </div>
    )
}