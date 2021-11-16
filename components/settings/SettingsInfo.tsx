import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import CourseInfo from "./CourseInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { isHta } from "../../util/db";
import { DocumentData } from "@firebase/firestore";

export default function SettingsInfo() {
    const [user] = useAuthState(auth);
    const [cid, setCid] = useState("");
    const [courses, setCourses] = useState<DocumentData[]>([]);

    useEffect(() => {
        if (user)
            isHta(user.uid).then((x) =>
                setCourses(x.docs.map((x) => x.data()))
            );
    }, []);

    const DropDown = () => (
        <select value={cid} onChange={(e) => setCid(e.target.value)}>
            <option value={""}></option>
            {courses.map((x) => (
                <option value={x.id} key={x.id}>
                    {x.code}
                </option>
            ))}
        </select>
    );

    return (
        <div className={styles.info}>
            <div className={styles.settingsBar}>
                <h2>HTA Panel</h2>
                <DropDown />
            </div>
            <hr />
            <CourseInfo isAdmin={false} cid={cid} />
        </div>
    );
}
