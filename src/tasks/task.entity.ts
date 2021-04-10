import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => User, user => user.tasks, {
        onDelete: 'SET NULL'
    })
    user: User

    @Column({
        length: 500
    })
    description: string;

    @Column()
    status: string
}