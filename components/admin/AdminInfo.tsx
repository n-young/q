import React, { useState } from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { NewCourse } from "./NewCourse";
import styles from "./Admin.module.css";
import CourseInfo from "./CourseInfo";

export default function AdminInfo() {
    const [cid, setCid] = useState("")
    const [courses, loading, error] = useCollectionData(
        collection(firestore, "courses")
    );

    const DropDown = () => (
        <select value={cid} onChange={(e) => setCid(e.target.value)}>
            <option value={""}></option>
            {!loading &&
                courses &&
                courses?.map((x) => <option value={x.id} key={x.id}>{x.code}</option>)}
        </select>
    );

    return (
        <div className={styles.info}>
            <h2>Admin Panel</h2>
            <div className={styles.adminBar}>
                <NewCourse />
                <DropDown />
            </div>
            <hr/>
            <CourseInfo cid={cid} />
        </div>
    );
}
