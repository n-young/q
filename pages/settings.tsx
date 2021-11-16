import React from "react";
import SettingsInfo from "../components/settings/SettingsInfo";
import Main from "../components/common/Main";
import { useAdminGuard } from "../util/hooks";

export default function Settings() {
    return (
        <Main>
            <SettingsInfo />
        </Main>
    );
}
