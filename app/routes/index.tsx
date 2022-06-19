import { Container, Stack, Text } from "@mantine/core";
import { Header } from "~/component/Header";

export default function IndexPage() {
    return (
        <Stack>
            <Header />
            <Container>
                <Text>Hello World!</Text>
            </Container>
        </Stack>
    );
}

