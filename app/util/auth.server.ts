import { Auth } from "@encode42/remix-extras";
import { GitHubStrategy, SocialsProvider } from "remix-auth-socials";
import { api } from "~/util/api.server";
import { Provider, RegisteredProvider } from "~/util/interface/auth/Provider";

const registeredProviders: RegisteredProvider[] = [{
    "name": "GitHub",
    "route": SocialsProvider.GITHUB,
    "strategy": GitHubStrategy,
    "options": {
        "clientID": process.env.GITHUB_CLIENT_ID,
        "clientSecret": process.env.GITHUB_CLIENT_SERET
    }
}];

let auth: Auth;
let providers: Provider[];

declare global {
    var __auth: Auth | undefined;
    var __providers: Provider[] | undefined;
}

if (process.env.NODE_ENV === "production") {
    const result = initAuth();

    auth = result.auth;
    providers = result.providers;
} else {
    if (!global.__auth) {
        const result = initAuth();

        global.__auth = result.auth;
        global.__providers = result.providers;
    }

    auth = global.__auth;
    providers = global.__providers;
}

function initAuth() {
    const newAuth = new Auth({
        api
    });

    const newProviders: Provider[] = [];

    for (const provider of registeredProviders) {
        const register = newAuth.register({
            "strategy": GitHubStrategy,
            "provider": SocialsProvider.GITHUB,
            "options": {
                "clientID": process.env.GITHUB_CLIENT_ID,
                "clientSecret": process.env.GITHUB_SECRET,
            }
        });

        newProviders.push({
            "name": provider.name,
            "route": register.route.default
        });
    }

    return {
        "auth": newAuth,
        "providers": newProviders
    };
}

export { auth, providers };
