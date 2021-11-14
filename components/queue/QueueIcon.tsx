import React, { ReactElement } from "react";
import { useRouter } from 'next/router'
import styled from "styled-components";
import { QueueType } from "../../util/types";

export const QueueHolder = styled.div`
    background-color: var(--color-white);
    border-radius: 10px;
    margin: 10px;
    padding: 10px 20px;
    display: grid;
`;

interface QueueProps {
    queue: QueueType;
}
export function QueueIcon(props: QueueProps): ReactElement<QueueProps> {
    const router = useRouter()

    return (
        <QueueHolder onClick={() => router.push(`/q/${props.queue.id}`)}>
            <h2>{props.queue.course}</h2>
            <p>{props.queue.location}</p>
        </QueueHolder>
    );
}
