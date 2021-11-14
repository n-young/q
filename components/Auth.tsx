import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../util/firebase";
import { persistUser } from "../util/db";

export function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((res) => {
            // Ensure that the user exists in the database so we can access user data.
            const userData = res.user;
            const user = {
                id: userData.uid,
                email: userData.email || "",
                name: userData.displayName || "",
            };
            persistUser(userData.uid, user)
        });
    };

    return <button onClick={signInWithGoogle}>Sign In</button>;
}

export function SignOut() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
