import { EGender } from "./EGender.model";
import { ERole } from "./ERole.model";

export class UserRoot {
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
export class BusinessUserRegister extends UserRoot {
    companyName: string
    site: string

    constructor(username: string, password: string, email: string, role: ERole, enabled: boolean, companyName: string, site: string) {
        super(username, password, email, role, enabled)
        this.companyName = companyName
        this.email = email
        this.site = site
    }
}
export class RegularUserRegister extends UserRoot {
    firstname: string
    lastname: string
    gender: EGender
    yearOfBirth: number
    town: string
    private: boolean

    constructor(username: string, password: string, email: string, role: ERole, enabled: boolean, firstname: string, lastname: string, gender: EGender, yearOfBirth: number, town: string, privateAcc: boolean) {
        super(username, password, email, role, enabled)
        this.firstname = firstname
        this.lastname = lastname
        this.gender = gender
        this.yearOfBirth = yearOfBirth
        this.town = town
        this.private = privateAcc
    }
}
export class UserDetails {
    username: string
    role: string
    exp: string

    constructor(username: string, role: string, exp: string) {
        this.username = username
        this.role = role
        this.exp = exp
    }
}
export class User extends UserRoot {
    firstName: string
    lastName: string
    gender: EGender
    yearOfBirth: number
    town: string
    private: boolean
    companyName: string
    website: string
    constructor(username: string, password: string, email: string, role: ERole, enabled: boolean, firstName: string, lastName: string, gender: EGender, yearOfBirth: number, town: string, privateAcc: boolean, companyName: string, website: string) {
        super(username, password, email, role, enabled)
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.yearOfBirth = yearOfBirth
        this.town = town
        this.private = privateAcc
        this.companyName = companyName
        this.website = website
    }
}