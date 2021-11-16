import React from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import styles from "./Admin.module.css";

interface TAProps {
    uid: string;
}
const TA = ({ uid }: TAProps) => {
    const [user, loading, error] = useDocumentData(
        doc(firestore, "users", uid || "dummy")
    );
    return !loading && user ? (
        <div className={styles.ta}>
            <p>{user.name} : {user.email}</p>
        </div>
    ) : (
        <div>
            <p>TA {uid} not found.</p>
        </div>
    );
};

interface CourseInfoProps {
    cid: string;
}
export default function CourseInfo({ cid }: CourseInfoProps) {
    const [course, loading, error] = useDocumentData(
        doc(firestore, "courses", cid || "dummy")
    );

    if (loading || !course) return <></>;

    const TAs = () => (
        <div>
            <h2>TAs:</h2>
            {course.tas.map((uid: string) => (
                <TA key={uid} uid={uid} />
            ))}
        </div>
    );

    const HTAs = () => (
        <div>
            <h2>HTAs:</h2>
            {course.htas.map((uid: string) => (
                <TA key={uid} uid={uid} />
            ))}
        </div>
    );

    return (
        <>
            <TAs />
            <HTAs />
        </>
    );
}
