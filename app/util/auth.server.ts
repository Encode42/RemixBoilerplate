import { Auth, registerProps } from "@encode42/remix-extras";
import { GitHubProfile, GitHubStrategy, GoogleProfile, GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import { api } from "~/util/api.server";
import { PrivateUser, User } from "~/types";
import { db } from "~/util/db.server";
import { User as DBUser } from "@prisma/client";

const providers: registerProps<unknown>[] = [{
    "name": "GitHub",
    "provider": SocialsProvider.GITHUB,
    "strategy": GitHubStrategy,
    "verify": async <GitHubProfile>(user: GitHubProfile) => {
        const id = await newOrUpdate({
            "email": user.profile.emails[0].value,
            "profileIds": {
                "githubId": user.profile.id
            }
        });

        return {
            "id": id,
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
    "verify": async <GoogleProfile>(user: GoogleProfile) => {
        const id = await newOrUpdate({
            "email": user.profile.emails[0].value,
            "profileIds": {
                "googleId": user.profile.id
            }
        });

        return {
            "id": id,
            "name": user.profile.displayName,
            "picture": user.profile._json.picture
        };
    },
    "options": {
        "clientID": process.env.GOOGLE_CLIENT_ID,
        "clientSecret": process.env.GOOGLE_CLIENT_SECRET
    }
}];

interface newOrUpdateProps {
    "email": string,
    "profileIds": Record<string, string>
}

function missingAny(user: DBUser, data: Record<string, string>) {
    let missing = false;
    for (const key of Object.keys(data)) {
        if (!user[key]) {
            missing = true;
        }
    }
    return missing;
}

async function newOrUpdate({ email, profileIds }: newOrUpdateProps) {
    let existingUser = await db.user.findUnique({
        "where": {
            email
        }
    });

    if (!existingUser) {
        existingUser = await db.user.create({
            "data": {
                profileIds,
                email
            }
        });
    } else if (missingAny(existingUser, profileIds)) {
        existingUser = await db.user.update({
            "where": {
                email
            },
            "data": {
                "profileIds": {
                    ...existingUser.profileIds,
                    ...profileIds
                }
            }
        });
    }

    return existingUser.id
}

let auth: Auth<PrivateUser>;

declare global {
    var __auth: Auth<PrivateUser> | undefined;
}

if (process.env.NODE_ENV === "production") {
    auth = Auth.from<PrivateUser>({
        api,
        providers
    });
} else {
    if (!global.__auth) {
        global.__auth = Auth.from<PrivateUser>({
            api,
            providers
        });
    }

    auth = global.__auth;
}

export { auth };
