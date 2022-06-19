import { MetaDescriptor } from "@remix-run/node";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ReactNode, useState } from "react";
import { details } from "~/data/details";
import { Links, LiveReload, Meta, Outlet, Scripts, useFetcher, useLoaderData } from "@remix-run/react";
import { getResult, RouteRequest, UserProvider } from "@encode42/remix-extras";
import { theme } from "~/util/theme.server";
import { auth } from "~/util/auth.server";
import { User } from "~/types";

interface DocumentProps {
    "children": ReactNode,
    "title"?: string,
    "prefix"?: boolean
}

interface LoaderResult {
    "theme": getResult,
    "user": User,
    "logoutRoute": string,
    "themeSetRoute": string
}

export function meta() {
    return {
        "charset": "utf-8",
        "viewport": "width=device-width,initial-scale=1"
    } as MetaDescriptor;
}

export function links() {
    return [{
        "rel": "icon",
        "href": "/favicon/favicon.svg",
        "type": "image/svg+xml"
    }, {
        "rel": "icon",
        "href": "/favicon/favicon.png",
        "type": "image/png"
    }];
}

export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}

export async function loader({ request }: RouteRequest): Promise<LoaderResult> {
    const user = await auth.getAccount(request);

    return {
        "theme": await theme.get(request),
        "user": user,
        "logoutRoute": auth.logoutRoute,
        "themeSetRoute": theme.setRoute
    };
}

function Document({ children }: DocumentProps) {
    const data = useLoaderData<LoaderResult>();
    const fetcher = useFetcher();

    const [colorScheme, setColorScheme] = useState<ColorScheme>(data.theme.colorScheme);

    function toggleColorScheme(value: ColorScheme) {
        const newColorScheme = value ?? (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(newColorScheme);

        fetcher.submit({
            "colorScheme": newColorScheme
        }, {
            "method": "post",
            "action": data.themeSetRoute
        });
    }

    return (
        <html lang="en">
            <head>
                <title>{details.name}</title>
                <Meta />
                <Links />
            </head>
            <body>
                <UserProvider user={data.user} logoutRoute={data.logoutRoute}>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider withGlobalStyles withNormalizeCSS theme={{
                            "primaryColor": "blue",
                            colorScheme
                        }}>
                            <NotificationsProvider>
                                <ModalsProvider>
                                    {children}
                                </ModalsProvider>
                            </NotificationsProvider>
                        </MantineProvider>
                    </ColorSchemeProvider>
                    <Scripts />
                    <LiveReload />
                </UserProvider>
            </body>
        </html>
    );
}

/*
export function CatchBoundary() {
    const caught = useCatch();

    let message;
    switch (caught.status) {
        case 401:
            message = <p>You do not have access to this page.</p>;
            break;
        case 404:
            message = <p>This page does not exist.</p>;
            break;
        default:
            throw new Error(caught.data || caught.statusText);
    }

    return (
        <Document>
            <ErrorPage title={caught.statusText} statusCode={caught.status} />
        </Document>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);

    return (
        <Document>
            <ErrorPage title={error.name} statusCode={500} />
        </Document>
    )
}
 */
