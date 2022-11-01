import { ERole } from "./ERole.model";

export class User {
    username: string
    password: string
    role: ERole
    enabled: boolean

    constructor(username: string, password: string, role: ERole, enabled: boolean) {
        this.username = username
        this.password = password
        this.role = role
        this.enabled = enabled
    }
}