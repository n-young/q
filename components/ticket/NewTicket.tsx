import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import { createTicket } from "../../util/db";

const modalStyle = {
    content: {
        top: "30%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: "50px 100px",
        borderRadius: "0",
        border: "1px black solid",
        transform: "translate(-50%, -50%)",
    },
};

interface TicketModalProps {
    isOpen: boolean;
    closeModal: () => void;
    qid: string;
}
function TicketModal(props: TicketModalProps) {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={modalStyle}
            contentLabel="Join the Queue"
        >
            <h2>Join the Queue</h2>
            <form
                onSubmit={(e) => {
                    if (user && user.displayName && props.qid) {
                        createTicket(user.displayName, message, props.qid);
                    }
                    setMessage("");
                    props.closeModal();
                    e.preventDefault();
                }}
            >
                <input
                    value={message}
                    onChange={(x) => setMessage(x.target.value)}
                    required
                    placeholder={"message (required)"}
                    autoFocus={true}
                />
                <button type="submit">join</button>
            </form>
        </Modal>
    );
}

interface NewTicketProps {
    qid: string;
}
export default function NewTicket({ qid }: NewTicketProps) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <TicketModal
                qid={qid}
                isOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(true)}>Join</button>
        </>
    );
}
