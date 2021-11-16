import React from "react";
import Main from "../components/common/Main";
import { useAdminGuard } from "../util/hooks";

export default function Admin() {
    const isAdmin = useAdminGuard()

    return isAdmin && (
        <Main>
            <h2>Admin</h2>
        </Main>
    );
}
