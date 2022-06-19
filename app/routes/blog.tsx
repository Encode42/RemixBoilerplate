import { useLoaderData } from "@remix-run/react";
import { RouteRequest } from "@encode42/remix-extras";
import { auth } from "~/util/auth.server";
import { Container, Stack, Text, Title } from "@mantine/core";
import { ThemePaper } from "@encode42/mantine-extras";
import { Header } from "~/component/Header";

interface LoaderData {
    "username": string,
    "profilePicture": string,
    "logoutRoute": string
}

export async function loader({ request }: RouteRequest) {
    const user = await auth.getAccount(request);

    return user ? {
        "username": user.profile.displayName,
        "profilePicture": user.profile._json.avatar_url,
        "logoutRoute": auth.logoutRoute
    } : null;
}

export default function BlogPage() {
    const data = useLoaderData<LoaderData>();

    return (
        <Stack>
            <Header user={data} />
            <Container>
                <Stack>
                    <ThemePaper>
                        <Stack>
                            <Title>Hello World!</Title>
                            <Text>Theme persists between reloads, navigation, and restarts.</Text>
                        </Stack>
                    </ThemePaper>
                    <ThemePaper>
                        <Stack>
                            <Title>No theme flash.</Title>
                            <Text>No flash of black or white on reloads. SSR!</Text>
                        </Stack>
                    </ThemePaper>
                </Stack>
            </Container>
        </Stack>
    );
}
