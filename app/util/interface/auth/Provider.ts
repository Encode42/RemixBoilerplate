export interface RegisteredProvider extends Provider {
    "strategy": any, // todo
    "options": Record<string, any>
}

export interface Provider {
    "name": string,
    "route": string
}
