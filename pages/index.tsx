import React, { FC } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../util/firebase";
import Nav from "../components/Nav";
import { QueueType } from "../util/types";

const QueueHolder = styled.div`
    background-color: var(--color-white);
    border-radius: 10px;
    margin: 10px;
    padding: 10px 20px;
    display: grid;
`;

interface QueueProps {
    queue: QueueType;
}
const Queue: FC<QueueProps> = ({ queue }) => {
    return (
        <QueueHolder>
            <h2>{queue.course}</h2>
            <p>{queue.location}</p>
        </QueueHolder>
    );
};

const QueuesHolder = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

function NewQueue() {
    const createQueue = () => {
        addDoc(collection(firestore, "queues"), {
            id: uuidv4(),
            course: "CSCI 1270",
            location: "Zoom",
            tickets: ["string"],
        }).then((x) => console.log(x));
    };
    return (
        <QueueHolder>
            <h2>New Queue</h2>
            <button onClick={createQueue}>Create</button>
        </QueueHolder>
    );
}

const Queues = () => {
    const [messages, loading, error] = useCollectionData(
        collection(firestore, "queues")
    );
    return error ? (
        error
    ) : (
        <QueuesHolder>
            {!loading &&
                messages &&
                messages.map((x, i) => {
                    console.log(x);
                    console.log(x.data);
                    const q = {
                        id: x.id,
                        course: x.course,
                        location: x.location,
                        tickets: x.tickets,
                    };
                    return <Queue key={i} queue={q} />;
                })}
                <NewQueue/>
        </QueuesHolder>
    );
};

const Main = styled.div`
    width: var(--md-width);
    padding: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

export default function Home() {
    return (
        <Main>
            <Nav />
            <Queues />
            <button onClick={() => newQueue()}>click</button>
        </Main>
    );
}
