import { Stack, Text, Title } from "@mantine/core";
import { ThemePaper } from "@encode42/mantine-extras";
import { StandardLayout } from "~/layout/StandardLayout";

export default function BlogPage() {
    return (
        <StandardLayout>
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
        </StandardLayout>
    );
}
