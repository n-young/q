import React from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import styles from "./Settings.module.css";
import NewTA from "./NewTA";
import { removeHTA, removeTA } from "../../util/db";

interface TAProps {
    cid: string;
    uid: string;
    isHTA: boolean;
}
const TA = ({ cid, uid, isHTA }: TAProps) => {
    const [user, loading, error] = useDocumentData(
        doc(firestore, "users", uid || "dummy")
    );

    const TAInfo = () =>
        !loading && user ? (
            <div className={styles.ta}>
                <p>
                    {user.name} : {user.email}
                </p>
            </div>
        ) : (
            <div>
                <p>TA {uid} not found.</p>
            </div>
        );

    const TADelete = () => (
        <a
            className={styles.delete}
            onClick={() =>
                isHTA ? removeHTA(cid, user?.email) : removeTA(cid, user?.email)
            }
        >
            Delete
        </a>
    );

    return !loading ? (
        <div className={styles.horizontal}>
            <TAInfo />
            <TADelete />
        </div>
    ) : <></>
};

interface CourseInfoProps {
    isAdmin: boolean;
    cid: string;
}
export default function CourseInfo({ isAdmin, cid }: CourseInfoProps) {
    const [course, loading, error] = useDocumentData(
        doc(firestore, "courses", cid || "dummy")
    );

    if (loading || !course) return <></>;

    const TAs = () => (
        <div>
            <div className={styles.horizontal}>
                <h2>TAs:</h2>
                <NewTA cid={course.id} isHTA={false} />
            </div>
            {course.tas.map((uid: string) => (
                <TA key={uid} cid={course.id} uid={uid} isHTA={false} />
            ))}
        </div>
    );

    const HTAs = () => (
        <div>
            <div className={styles.horizontal}>
                <h2>HTAs:</h2>
                <NewTA cid={course.id} isHTA={true} />
            </div>
            {course.htas.map((uid: string) => (
                <TA key={uid} cid={course.id} uid={uid} isHTA={true} />
            ))}
        </div>
    );

    return (
        <>
            {isAdmin && <HTAs />}
            <TAs />
        </>
    );
}
