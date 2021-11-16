import React, { useState } from "react";
import styles from "./Settings.module.css";
import CourseInfo from "./CourseInfo";
import { useHtaCourses } from "../../util/hooks";

export default function HTAPanel() {
    const [cid, setCid] = useState("");
    const courses = useHtaCourses();

    const DropDown = () => (
        <select value={cid} onChange={(e) => setCid(e.target.value)}>
            <option disabled value={""}></option>
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
