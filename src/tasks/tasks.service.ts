import { Injectable } from '@nestjs/common';
import { TaskStatus } from 'src/enum/task.status.enum';
import { Task } from 'src/interfaces/task.interface';

@Injectable()
export class TasksService {

    private readonly tasks: Task[] = [
        {
            id: 1,
            uid: 1,
            description: 'First task',
            status: TaskStatus.COMPLETED
        },
        {
            id: 2,
            uid: 1,
            description: 'Second task',
            status: TaskStatus.PENDIND
        },
        {
            id: 3,
            uid: 2,
            description: 'Third task',
            status: TaskStatus.PENDIND
        }
    ];

    getTasks() {
        return this.tasks;
    }

    getTask(uid: number) {
        return this.tasks.filter(task => task.uid === uid);
    }

    create(task: Task) {
        this.tasks.push(task);
        return task;
    }

    delete(id: number) {
        let idx = this.tasks.findIndex(task => task.id === id);
        if(idx != -1) {
            return this.tasks.splice(idx, 1);
        }
        return null;
    }

}
