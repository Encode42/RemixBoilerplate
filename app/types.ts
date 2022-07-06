import { GenericUser } from "@encode42/remix-extras";

export interface User extends GenericUser {}

export interface PrivateUser extends User {
    "id": string
}
