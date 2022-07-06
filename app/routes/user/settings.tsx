import { Button } from "@encode42/mantine-extras";
import { auth } from "~/util/auth.server";
import { brandIcons, RegisteredProvider, RouteRequest } from "@encode42/remix-extras";
import { useLoaderData } from "@remix-run/react";
import { ColorScheme, Select, SelectItem, Stack, Title, useMantineColorScheme } from "@mantine/core";
import { StandardLayout } from "~/layout/StandardLayout";

interface LoaderData {
    "providers": RegisteredProvider[]
}

interface ColorSchemes extends SelectItem {
    "value": ColorScheme
}

const colorSchemes: ColorSchemes[] = [{
    "value": "dark",
    "label": "Dark"
}, {
    "value": "light",
    "label": "Light"
}];

export async function loader({ request }: RouteRequest): Promise<LoaderData> {
    const user = await auth.requiredAccount(request);

    return {
        "providers": auth.registeredProviders
    };
}

export default function SettingsPage() {
    const data = useLoaderData<LoaderData>();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <StandardLayout>
            <Stack spacing="xl">
                <Stack>
                    <Title>Preferences</Title>
                    <Select label="Color Scheme" data={colorSchemes} value={colorScheme} onChange={value => {
                        if (!value) {
                            return;
                        }

                        toggleColorScheme(value as ColorScheme);
                    }} />
                </Stack>
                <Stack>
                    <Title>Linked Accounts</Title>
                    <Stack>
                        {data.providers.map(provider => (
                            <Button key={provider.name} leftIcon={brandIcons[provider.provider]}>
                                Link to {provider.name}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
                <Stack>
                    <Title>Danger Zone</Title>
                    <Button color="red">
                        Delete User
                    </Button>
                </Stack>
            </Stack>
        </StandardLayout>
    )
}
