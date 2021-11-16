import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { modalStyle } from "../../util/constants";
import { addTA, addHTA } from "../../util/db";
import styles from "./Settings.module.css";

interface TAModalProps {
    isOpen: boolean;
    closeModal: () => void;
    isHTA: boolean;
    cid: string;
}
function TAModal({ isOpen, closeModal, isHTA, cid }: TAModalProps) {
    const [email, setEmail] = useState("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Create a new TA"
        >
            <h2>Add a {isHTA ? "HTA" : "TA"}</h2>
            <form
                onSubmit={(e) => {
                    isHTA
                        ? addHTA(cid, email, toast)
                        : addTA(cid, email, toast);
                    setEmail("");
                    closeModal();
                    e.preventDefault();
                }}
            >
                <div className={styles.form}>
                    <label>TA Email: </label>
                    <input
                        value={email}
                        onChange={(x) => setEmail(x.target.value)}
                        autoFocus={true}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </Modal>
    );
}

interface NewTAProps {
    isHTA: boolean;
    cid: string;
}
export default function NewTA({ isHTA, cid }: NewTAProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <TAModal
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
                isHTA={isHTA}
                cid={cid}
            />
            <button onClick={() => setIsOpen(true)}>
                New {isHTA ? "HTA" : "TA"}
            </button>
        </>
    );
}
