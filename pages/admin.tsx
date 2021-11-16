import React from "react";
import MTAPanel from "../components/settings/MTAPanel";
import Main from "../components/common/Main";
import { useAdminGuard } from "../util/hooks";

export default function Admin() {
    const isAdmin = useAdminGuard()

    return isAdmin && (
        <Main>
            <MTAPanel />
        </Main>
    );
}
