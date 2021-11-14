import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import QueueList from "../components/queue/QueueList"


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
            <QueueList />
        </Main>
    );
}
