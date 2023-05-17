import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({name: 'user_profile'})
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    dob:string

}