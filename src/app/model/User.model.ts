import { ERole } from "./ERole.model";

export class User {
    username: string
    password: string
    email: string
    role: ERole
    enabled: boolean

    constructor(username: string, password: string, email: string, role: ERole, enabled: boolean) {
        this.username = username
        this.password = password
        this.email = email
        this.role = role
        this.enabled = enabled
    }
}
export class Follow {
    from: string
    to: string
    constructor(from: string, to: string) {
        this.from = from
        this.to = to
    }
}