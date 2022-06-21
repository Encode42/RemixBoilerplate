import { useLoaderData } from "@remix-run/react";
import { Login, RegisteredProvider } from "@encode42/remix-extras";
import { auth } from "~/util/auth.server";
import { Center } from "@mantine/core";
import { StandardLayout } from "~/layout/StandardLayout";
import { details } from "~/data/details";

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

    return (
        <StandardLayout>
            <Center>
                <Login name={details.name} providers={data.providers} />
            </Center>
        </StandardLayout>
    );
}
