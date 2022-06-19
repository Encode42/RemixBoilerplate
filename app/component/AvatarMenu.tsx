import { useSubmit } from "@remix-run/react";
import { Avatar, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import React from "react";
import { useUser } from "@encode42/remix-extras";
import { User } from "~/types";

export function AvatarMenu() {
    const submit = useSubmit();
    const { user, logoutRoute } = useUser<User>();

    return (
        <Menu control={<Avatar src={user.picture} />} sx={{
            "cursor": "pointer"
        }}>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item color="red" icon={<IconLogout />} onClick={() => {
                submit(null, {
                    "method": "post",
                    "action": logoutRoute
                });
            }}>Logout</Menu.Item>
        </Menu>
    );
}
