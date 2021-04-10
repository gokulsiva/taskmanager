import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        select: false
    })
    password: string;

    @OneToMany(type => Task, task => task.user)
    tasks: Task[]
}