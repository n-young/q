import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../util/firebase";
import { getAdminByID, isTa, isTaFor, isHta, isHtaFor, getTicket } from "./db";
import { DocumentData } from "firebase/firestore";

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

    return [isAdmin, loading];
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
    }, [loading, router, user]);

    return [isAdmin, loading];
}

export function useTA() {
    const [user, loading] = useAuthState(auth);
    const [isATa, setIsATa] = useState(false);

    useEffect(() => {
        if (user)
            isTa(user.uid).then((res) => {
                if (res.docs.length > 0) setIsATa(true);
            });
    }, [user]);

    return [isATa, loading];
}

export function useTAFor(queue: any) {
    const [user, loading] = useAuthState(auth);
    const [isTa, setIsTa] = useState(false);

    useEffect(() => {
        if (user && queue) {
            isTaFor(user.uid, queue.course).then((res) =>
                res.forEach((_) => setIsTa(true))
            );
            isHtaFor(user.uid, queue.course).then((res) =>
                res.forEach((_) => setIsTa(true))
            );
        }
    }, [queue, user]);

    return [isTa, loading];
}

export function useHTA() {
    const [user, loading] = useAuthState(auth);
    const [isAnHta, setIsAnHta] = useState(false);

    useEffect(() => {
        if (user)
            isHta(user.uid).then((res) => {
                if (res.docs.length > 0) setIsAnHta(true);
            });
    }, [user]);

    return [isAnHta, loading];
}

export function useHTAGuard() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (user) {
            isHta(user.uid).then((res) => {
                const isAnHta = res.docs.length > 0;
                if (!isAnHta) {
                    toast("You must be an HTA to access this page.", {
                        position: "top-center",
                        type: "error",
                    });
                    router.push("/");
                } else if (isAnHta) {
                    setDone(true);
                }
            });
        } else {
            toast("You must be logged in to access this page.", {
                position: "top-center",
                type: "error",
            });
            router.push("/");
        }
    }, [router, user]);

    return [done, loading];
}

export function useHTAFor(queue: any) {
    const [user, loading] = useAuthState(auth);
    const [isHta, setIsHta] = useState(false);

    useEffect(() => {
        if (user && queue) {
            isHtaFor(user.uid, queue.course).then((res) =>
                res.forEach((_) => setIsHta(true))
            );
        }
    }, [queue, user]);

    return [isHta, loading];
}

export function useHtaCourses() {
    const [user] = useAuthState(auth);
    const [courses, setCourses] = useState<DocumentData[]>([]);

    useEffect(() => {
        if (user) {
            isHta(user.uid).then((x) =>
                setCourses(x.docs.map((x) => x.data()))
            );
        }
    }, [user]);

    return courses;
}

export function useTaCourses() {
    const [user] = useAuthState(auth);
    const [courses, setCourses] = useState<DocumentData[]>([]);

    useEffect(() => {
        if (user) {
            let cs: DocumentData[] = [];
            isTa(user.uid).then((x) => {
                cs = cs.concat(x.docs.map((x) => x.data()));
                isHta(user.uid).then((x) => {
                    cs = cs.concat(
                        x.docs
                            .map((x) => x.data())
                            .filter((x) => !cs.some((y) => y.code === x.code))
                    );
                    setCourses(cs);
                });
            });
        }
    }, [user]);

    return courses;
}

export function useQueueTickets(queue: any) {
    const [tickets, setTickets] = useState<any>([]);

    useEffect(() => {
        Promise.all(
            queue.tickets.map((x: string) => {
                return getTicket(x).then((y) => y.data());
            })
        ).then((res) => setTickets(res));
    }, [queue.tickets]);

    return tickets;
}
