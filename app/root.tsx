import { MetaDescriptor } from "@remix-run/node";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ReactNode } from "react";
import { details } from "~/data/details";
import { Links, LiveReload, Meta, Outlet, Scripts, useCatch } from "@remix-run/react";
import { ErrorPage } from "@encode42/remix-extras";

interface DocumentProps {
    "children": ReactNode,
    "title"?: string,
    "prefix"?: boolean
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
        "href": "/favicon/cog.svg",
        "type": "image/svg+xml"
    }, {
        "rel": "icon",
        "href": "/favicon/cog.png",
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

function Document({ children }: DocumentProps) {
    return (
        <html lang="en">
        <head>
            <title>{details.name}</title>
            <Meta />
            <Links />
        </head>
        <body>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{
            "primaryColor": "blue",
            "colorScheme": "dark"
        }}>
            <NotificationsProvider>
                <ModalsProvider>
                    {children}
                </ModalsProvider>
            </NotificationsProvider>
        </MantineProvider>
        <Scripts />
        <LiveReload />
        </body>
        </html>
    );
}

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
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);

    return (
        <Document>
            <ErrorPage title={error.name} statusCode={500} />
        </Document>
    )
}
