import { RegisteredProvider } from "@encode42/remix-extras";
import { auth } from "~/util/auth.server";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { Button, Stack } from "@mantine/core";

interface LoaderResponse {
    "providers": RegisteredProvider[]
}

export function loader(): LoaderResponse {
    return {
        "providers": auth.registeredProviders
    };
}

export default function LoginPage() {
    const data = useLoaderData<LoaderResponse>();
    const submit = useSubmit();

    return (

        <Stack>
            {data.providers.map(provider => (
                <Button key={provider.name} onClick={() => {
                    submit(null, {
                        "method": "post",
                        "action": provider.route.default
                    });
                }}>
                    Login with {provider.name}
                </Button>
            ))}
        </Stack>
    );
}
