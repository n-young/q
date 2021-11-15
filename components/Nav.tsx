import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import styles from "./Components.module.css";
import { auth } from "../util/firebase";
import { setUser } from "../util/db";

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((res) => {
            const userData = res.user;
            // Check if the user's email ends in @brown.edu
            if (userData.email && !userData.email.endsWith("brown.edu")) {
                toast("Please use your Brown University email to log in.", {
                    position: "top-center",
                    type: "error",
                });
                auth.signOut();
            }
            // Ensure that the user exists in the database so we can access user data.
            else {
                const user = {
                    id: userData.uid,
                    email: userData.email || "",
                    name: userData.displayName || "",
                };
                setUser(userData.uid, user);
            }
        });
    };

    return (
        <>
            <button onClick={signInWithGoogle}>Sign In</button>
        </>
    );
}

function SignOut({ router }: any) {
    return (
        <button
            onClick={() => {
                auth.signOut();
                router.reload("/")
            }}
        >
            Sign Out
        </button>
    );
}

export default function Nav() {
    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Q - Get in line!</title>
            </Head>
            <div className={styles.nav}>
                <div className={styles.navHolder}>
                    <h1
                        className={styles.icon}
                        onClick={() => router.push("/")}
                    >
                        Q
                    </h1>
                    <div className={styles.horizontal}>
                        {user ? (
                            <>
                                <p onClick={() => router.push("/settings")}>
                                    Settings
                                </p>
                                <SignOut router={router} />
                            </>
                        ) : (
                            <SignIn />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
