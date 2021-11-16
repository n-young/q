import React from "react";
import HTAPanel from "../components/settings/HTAPanel";
import Main from "../components/common/Main";
import { useHTAGuard } from "../util/hooks";

export default function Settings() {
    const isAnHta = useHTAGuard()

    return isAnHta && (
        <Main>
            <HTAPanel />
        </Main>
    );
}
