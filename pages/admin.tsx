import React from "react";
import AdminInfo from "../components/settings/AdminInfo";
import Main from "../components/common/Main";
import { useAdminGuard } from "../util/hooks";

export default function Admin() {
    const isAdmin = useAdminGuard()

    return isAdmin && (
        <Main>
            <AdminInfo />
        </Main>
    );
}
