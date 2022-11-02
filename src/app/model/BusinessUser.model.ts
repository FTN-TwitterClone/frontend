import { ERole } from "./ERole.model";
import { User } from "./User.model";

export class BusinessUser extends User {
    companyName: string
    site: string

    constructor(username: string, password: string, email: string, role: ERole, enabled: boolean, companyName: string, site: string) {
        super(username, password, email, role, enabled)
        this.companyName = companyName
        this.email = email
        this.site = site
    }
}