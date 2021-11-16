import React, { useState } from "react";
import Modal from "react-modal";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { modalStyle } from "../../util/constants";

interface EditQueueModalProps {
    isOpen: boolean;
    closeModal: () => void;
    qid: string;
}
function EditQueueModal({ isOpen, closeModal, qid }: EditQueueModalProps) {
    const [user] = useAuthState(auth);
    const [queue, loading, error] = useDocumentData(
        doc(firestore, "queues", qid || "dummy")
    );

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Edit Queue"
        >
            <h2>Edit Queue</h2>
        </Modal>
    );
}

interface EditQueueProps {
    qid: string;
}
export default function EditQueue({ qid }: EditQueueProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <EditQueueModal
                qid={qid}
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    );
}
