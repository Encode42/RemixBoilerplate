import { Center, Container, Stack, Text, Title } from "@mantine/core";
import { Header } from "~/component/Header";
import { StandardLayout } from "~/layout/StandardLayout";
import { details } from "~/data/details";

export default function IndexPage() {
    return (
        <StandardLayout>
            <Stack>
                <Title>Hello World!</Title>
                <Text>This is an example index page for {details.name}.</Text>
            </Stack>
        </StandardLayout>
    );
}

