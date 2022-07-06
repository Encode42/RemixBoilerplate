import { useSubmit } from "@remix-run/react";
import { AspectRatio, Avatar, AvatarProps, Box, Menu, MenuProps } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons";
import { mergeSx } from "@encode42/mantine-extras";
import { Link, useUser } from "@encode42/remix-extras";

/**
 * Options for the {@link AvatarMenu} component.
 */
export interface AvatarMenuProps extends AvatarProps<"div"> {
    "height": number,

    /**
     * Profile picture to display.
     */
    "picture": string,

    /**
     * Options for the {@link https://mantine.dev/core/menu Menu} component.
     */
    "menuProps"?: MenuProps
}

/**
 * Component for user management.
 */
export function AvatarMenu({ height, picture, menuProps, sx, ...other }: AvatarMenuProps) {
    const submit = useSubmit();
    const { logoutRoute } = useUser();

    return (
            <Menu transition="pop-top-right" control={<Avatar src={picture} sx={mergeSx({
                "width": "100%",
                "height": "100%"
            }, sx)} {...other} />} sx={mergeSx({
                "cursor": "pointer",
                "height": height
            }, menuProps?.sx)} {...menuProps}>
                <Menu.Label>Account</Menu.Label>
                <Link to="/user/settings">
                    <Menu.Item icon={<IconSettings />}>
                        Settings
                    </Menu.Item>
                </Link>
                <Menu.Item color="red" icon={<IconLogout />} onClick={() => {
                    submit(null, {
                        "method": "post",
                        "action": logoutRoute
                    });
                }}>Logout</Menu.Item>
            </Menu>
    );
}
