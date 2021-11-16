import React from "react";
import Modal from "react-modal";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { modalStyle } from "../../util/constants";
import { setTicket } from "../../util/db";
import styles from "./Ticket.module.css";

interface EditTicketModalProps {
    isOpen: boolean;
    closeModal: () => void;
    tid: string;
}
function EditTicketModal({ isOpen, closeModal, tid }: EditTicketModalProps) {
    const [ticket, loading, error] = useDocumentData(
        doc(firestore, "tickets", tid || "dummy")
    );

    const setNewTicket = (newTicket: any) => {
        const toset = {
            ...ticket,
            ...newTicket,
        };
        setTicket(
            toset.id,
            toset.timestamp.toDate(),
            toset.student,
            toset.studentId,
            toset.message,
            toset.status
        );
    };

    return !loading && ticket ? (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Edit Ticket"
        >
            <h2>Edit Ticket</h2>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <label>Message:</label>
                <input
                    value={ticket.message}
                    onChange={(e) => setNewTicket({ message: e.target.value })}
                />
            </form>
        </Modal>
    ) : (
        <></>
    );
}

interface EditTicketProps {
    tid: string;
}
export default function EditTicket({ tid }: EditTicketProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <EditTicketModal
                tid={tid}
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <button onClick={() => {
                console.log("Open")
                setIsOpen(true)
            }}>Edit</button>
        </>
    );
}
