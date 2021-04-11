import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dto/create.task.dto';
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
        private readonly taskRepository: TaskRepository
    ) {}

    async getTasks() {
        return await this.taskRepository.find();
    }

    async getTask(id: number) {
        return await this.taskRepository.findOneOrFail({id}).catch(ex => {
            // log error
            throw new NotFoundException('Task not found');
        });
    }

    async create(taskDto: CreateTaskDto) {
        const qBuilder = this.taskRepository.createQueryBuilder();
        const result = await qBuilder.insert()
        .values({
            description: taskDto.description,
            status: taskDto.status,
            user: () => '(select uid from user where uid=:uid)'
        })
        .setParameter('uid', taskDto.uid)
        .execute().catch(ex => { throw new InternalServerErrorException('Issue adding task') });
        return await this.getTask(result.identifiers[0].id);
    }

    async delete(id: number) {
        await this.taskRepository.delete({id});
        return;
    }

}
