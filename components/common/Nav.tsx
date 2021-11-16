import React from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import styles from "./Common.module.css";
import { auth } from "../../util/firebase";
import { setUser } from "../../util/db";
import { useHTA } from "../../util/hooks";

export default function Nav() {
    const [user] = useAuthState(auth);
    const isAnHta = useHTA();
    const router = useRouter();

    const SignIn = () => {
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
                    // auth.signOut();
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
    };

    const SignOut = () => {
        return (
            <button
                onClick={() => {
                    auth.signOut();
                    router.push("/");
                    router.reload();
                }}
            >
                Sign Out
            </button>
        );
    };

    const SettingsLink = () =>
        isAnHta && <p onClick={() => router.push("/settings")}>Settings</p>;

    return (
        <>
            <div className={styles.nav}>
                <div className={styles.navHolder}>
                    <h1
                        className={styles.icon}
                        onClick={() => router.push("/")}
                    >
                        Q
                    </h1>
                    <div className={styles.navItems}>
                        {user ? (
                            <>
                                <SettingsLink />
                                <SignOut />
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
