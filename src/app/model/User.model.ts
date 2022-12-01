import { EGender } from "./EGender.model";
import { ERole } from "./ERole.model";

export interface User {
    username: string
    password: string
    email: string
    role: ERole
    enabled: boolean
    companyName: string
    site: string
    firstname: string
    lastname: string
    gender: EGender
    age: number
    town: string
    private: boolean
}