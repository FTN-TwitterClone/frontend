import { ERole } from "./ERole.model";
import { User } from "./User.model";

export class BusinessUser extends User {
    companyName: string
    email: string
    site: string

    constructor(username: string, password: string, role: ERole, enabled: boolean, companyName: string, email: string, site: string) {
        super(username, password, role, enabled)
        this.companyName = companyName
        this.email = email
        this.site = site
    }
}