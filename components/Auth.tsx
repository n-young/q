import React from "react";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../util/firebase";
import { setUser } from "../util/db";

export function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((res) => {
            const userData = res.user;
            // Check if the user's email ends in @brown.edu
            if (userData.email && !userData.email.endsWith("brown.edu")) {
                toast("Please use your Brown University email to log in.", {
                    position: "top-center",
                    type: "error"
                })
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

export function SignOut() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
