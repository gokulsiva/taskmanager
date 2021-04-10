import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dto/create.task.dto';
import { UsersService } from 'src/users/users.service';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    /*
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
    */

    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository,
        private readonly userService: UsersService
    ) {}

    async getTasks() {
        return await this.taskRepository.find();
    }

    async getTask(id: number) {
        const task = await this.taskRepository.findOne({id});
        return task;
    }

    async create(taskDto: CreateTaskDto) {
        const user = await this.userService.getUser(taskDto.uid);
        const task = new Task();
        task.description = taskDto.description;
        task.status = taskDto.status;
        if(user) {
            task.user = user;
        }
        return await this.taskRepository.save(task);
    }

    async delete(id: number) {
        return await this.taskRepository.delete({id});
    }

}
