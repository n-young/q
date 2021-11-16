import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../util/firebase";
import { getAdminByID, isTaFor, isHtaFor } from "./db";

export function useAdmin() {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            getAdminByID(user?.uid).then((res) => {
                if (res) res.forEach((_) => setIsAdmin(true));
            });
        }
    }, [user]);

    return isAdmin;
}

export function useAdminGuard() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            getAdminByID(user?.uid).then((res) => {
                let verified = false;
                if (res)
                    res.forEach((_) => {
                        setIsAdmin(true);
                        verified = true;
                    });
                if (!verified) {
                    toast("You must be an admin to access this page.", {
                        position: "top-center",
                        type: "error",
                    });
                    router.push("/");
                }
            });
        } else if (!loading) {
            toast("You must be logged in to access this page.", {
                position: "top-center",
                type: "error",
            });
            router.push("/");
        }
    }, [isAdmin, user, loading, router]);

    return isAdmin;
}

export function useTA(queue: any) {
    const [user, loading] = useAuthState(auth);
    const [isTa, setIsTa] = useState(false)

    useEffect(() => {
        if (user && queue) {
            isTaFor(user.uid, queue.course).then(res => res.forEach(_ => setIsTa(true)))
            isHtaFor(user.uid, queue.course).then(res => res.forEach(_ => setIsTa(true)))
        }
    }, [queue, user])

    return isTa
}

export function useHTA(queue: any) {
    const [user, loading] = useAuthState(auth);
    const [isHta, setIsHta] = useState(false)

    useEffect(() => {
        if (user && queue) {
            isHtaFor(user.uid, queue.course).then(res => res.forEach(_ => setIsHta(true)))
        }
    }, [queue, user])

    return isHta
}
