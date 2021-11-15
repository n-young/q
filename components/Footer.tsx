import React from "react";
import styles from "./Components.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerHolder}>
                <p>
                    <a href="https://github.com/n-young/q">Q</a> © 2020
                </p>
            </div>
        </div>
    );
}
