import { PropsWithChildren } from "react";
import { Link, LinkProps, LoginWrapper, useUser } from "@encode42/remix-extras";
import { Button, Group, ThemePaper, ThemeToggle } from "@encode42/mantine-extras";
import { User } from "~/types";
import { AvatarMenu } from "~/component/AvatarMenu";

interface HeaderButtonProps extends PropsWithChildren {
    "to": LinkProps["to"]
}

function HeaderButton({ to, children }: HeaderButtonProps) {
    return (
        <Link to={to}>
            <Button size="md" fullHeight>
                {children}
            </Button>
        </Link>
    );
}

export function Header() {
    const { user } = useUser<User>();

    return (
        <ThemePaper radius={0}>
            <Group position="apart" stretch>
                <Group stretch>
                    <HeaderButton to="/">
                        Home
                    </HeaderButton>
                    <HeaderButton to="/blog">
                        Blog
                    </HeaderButton>
                </Group>
                <Group stretch>
                    <ThemeToggle />
                    <LoginWrapper buttonProps={{
                        "size": "md",
                        "sx": {
                            "height": "100%"
                        }
                    }}>
                        <AvatarMenu height={44} picture={user?.picture} />
                    </LoginWrapper>
                </Group>
            </Group>
        </ThemePaper>
    );
}
