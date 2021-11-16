import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Main from "../components/common/Main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../util/firebase";
import { getAdminByID } from "../util/db";

export default function Admin() {
    const router = useRouter()
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            getAdminByID(user?.uid).then((res) => {
                let verified = false
                if (res) res.forEach((_) => {
                    setIsAdmin(true)
                    verified = true
                });
                if (!verified) {
                    toast("You must be an admin to access this page.", {
                        position: "top-center",
                        type: "error",
                    });
                    router.push("/")
                }
            });
        } else if (!loading) {
            toast("You must be logged in to access this page.", {
                position: "top-center",
                type: "error",
            });
            router.push("/")
        }
    }, [isAdmin, user, loading, router]);

    return isAdmin && (
        <Main>
            <h2>Admin</h2>
        </Main>
    );
}
