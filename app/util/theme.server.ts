import { Theme } from "@encode42/remix-extras";
import { api } from "~/util/api.server";

let theme: Theme;

declare global {
    var __theme: Theme | undefined;
}

if (process.env.NODE_ENV === "production") {
    theme = new Theme({
        "colorScheme": "light",
        api
    });
} else {
    if (!global.__theme) {
        global.__theme = new Theme({
            "colorScheme": "light",
            api
        });
    }

    theme = global.__theme;
}

export { theme };
