import { EGender } from "./EGender.model";
import { ERole } from "./ERole.model";
import { User } from "./User.model";

export class RegularUser extends User {
    firstname: string
    lastname: string
    gender: EGender
    age: number
    town: string

    constructor(username: string, password: string, email: string, role: ERole, enabled: boolean, firstname: string, lastname: string, gender: EGender, age: number, town: string) {
        super(username, password, email, role, enabled)
        this.firstname = firstname
        this.lastname = lastname
        this.gender = gender
        this.age = age
        this.town = town
    }
}