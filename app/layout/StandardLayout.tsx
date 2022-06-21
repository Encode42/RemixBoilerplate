import { PropsWithChildren } from "react";
import { Header } from "~/component/Header";
import { Container, Stack } from "@mantine/core";

export interface StandardLayoutProps extends PropsWithChildren {
    "container"?: boolean
}

export function StandardLayout({ container = true, children }: StandardLayoutProps) {
    return (
        <Stack spacing="xl">
            <Header />
            {container ? (
                <Container size="xl" sx={{
                    "minWidth": "50%"
                }}>
                    {children}
                </Container>
            ) : children}
        </Stack>
    );
}
