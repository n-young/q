import React from "react"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../util/firebase";
import { SignIn, SignOut } from "./Auth";

const NavDiv = styled.div`
    width: var(--md-width);
    padding: 20px 10px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default function Nav() {
    const [user] = useAuthState(auth);

    return (
        <NavDiv>
            <h1>Q</h1>
            {user ? <SignOut/> : <SignIn/>}
        </NavDiv>
    )
}