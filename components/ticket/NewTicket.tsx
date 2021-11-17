import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { createTicket } from "../../util/db";
import { modalStyle } from "../../util/constants";

interface TicketModalProps {
    ended: boolean;
    isOpen: boolean;
    closeModal: () => void;
    qid: string;
}
function TicketModal({ ended, isOpen, closeModal, qid }: TicketModalProps) {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Join the Queue"
            ariaHideApp={false}
        >
            <h2>Join the Queue</h2>
            <form
                onSubmit={(e) => {
                    if (user && user.displayName && qid && !ended) {
                        createTicket(
                            new Date(),
                            user.displayName,
                            user.uid,
                            message,
                            qid
                        );
                    } else if (ended) {
                        toast("Please use your Brown University email to log in.", {
                            position: "top-center",
                            type: "error",
                        });
                    }
                    setMessage("");
                    closeModal();
                    e.preventDefault();
                }}
            >
                <input
                    value={message}
                    onChange={(x) => setMessage(x.target.value)}
                    placeholder={"message (required)"}
                    autoFocus={true}
                    required
                />
                <button type="submit">join</button>
            </form>
        </Modal>
    );
}

interface NewTicketProps {
    qid: string;
    ended: boolean;
}
export default function NewTicket({ qid, ended }: NewTicketProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <TicketModal
                ended={ended}
                qid={qid}
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(true)}>Join</button>
        </>
    );
}
