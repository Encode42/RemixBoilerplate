import { ThemePaper } from "@encode42/mantine-extras";
import { Button, Group } from "@mantine/core";
import { Link, ThemeToggle, useUser } from "@encode42/remix-extras";
import { AvatarMenu } from "~/component/AvatarMenu";

export function Header() {
    const { user } = useUser();

    return (
        <ThemePaper radius={0}>
            <Group position="apart">
                <Group>
                    <Link to="/">
                        <Button size="md">
                            Home
                        </Button>
                    </Link>
                    <Link to="/blog">
                        <Button size="md">
                            Blog
                        </Button>
                    </Link>
                </Group>
                <Group>
                    <ThemeToggle />
                    {user ? (
                        <AvatarMenu />
                    ) : (
                        <Link to="/login">
                            <Button size="md">
                                Login
                            </Button>
                        </Link>
                    )}
                </Group>
            </Group>
        </ThemePaper>
    );
}
