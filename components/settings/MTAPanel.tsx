import React, { useState } from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { NewCourse } from "./NewCourse";
import styles from "./Settings.module.css";
import CourseInfo from "./CourseInfo";

export default function MTAPanel() {
    const [cid, setCid] = useState("")
    const [courses, loading, error] = useCollectionData(
        collection(firestore, "courses")
    );

    const DropDown = () => (
        <select value={cid} defaultValue={""} onChange={(e) => setCid(e.target.value)}>
            {!loading &&
                courses &&
                courses?.map((x) => <option value={x.id} key={x.id}>{x.code}</option>)}
        </select>
    );

    return (
        <div className={styles.info}>
            <h2>MTA Panel</h2>
            <div className={styles.settingsBar}>
                <NewCourse />
                <DropDown />
            </div>
            <hr/>
            <CourseInfo isAdmin={true} cid={cid} />
        </div>
    );
}
