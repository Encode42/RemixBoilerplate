import { Auth, registerProps } from "@encode42/remix-extras";
import { GitHubProfile, GitHubStrategy, GoogleProfile, GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import { api } from "~/util/api.server";
import { User } from "~/types";

const providers: registerProps<unknown>[] = [{
    "name": "GitHub",
    "provider": SocialsProvider.GITHUB,
    "strategy": GitHubStrategy,
    "verify": <GitHubProfile>(user: GitHubProfile) => {
        return {
            "name": user.profile.displayName,
            "picture": user.profile._json.avatar_url
        };
    },
    "options": {
        "clientID": process.env.GITHUB_CLIENT_ID,
        "clientSecret": process.env.GITHUB_CLIENT_SECRET
    }
}, {
    "name": "Google",
    "provider": SocialsProvider.GOOGLE,
    "strategy": GoogleStrategy,
    "verify": <GoogleProfile>(user: GoogleProfile) => {
        return {
            "name": user.profile.displayName,
            "picture": user.profile._json.picture
        };
    },
    "options": {
        "clientID": process.env.GOOGLE_CLIENT_ID,
        "clientSecret": process.env.GOOGLE_CLIENT_SECRET
    }
}];

let auth: Auth<User>;

declare global {
    var __auth: Auth<User> | undefined;
}

if (process.env.NODE_ENV === "production") {
    auth = Auth.from<User>({
        api,
        providers
    });
} else {
    if (!global.__auth) {
        global.__auth = Auth.from<User>({
            api,
            providers
        });
    }

    auth = global.__auth;
}

export { auth };
