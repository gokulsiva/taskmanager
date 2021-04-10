import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from 'src/dto/create.task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService) {}

    @Get('/')
    getUsers() {
        return this.taskService.getTasks();
    }

    @Get('/:uid')
    getUserDetails(@Param('uid', ParseIntPipe) uid: number) {
        return this.taskService.getTask(uid);
    }

    @Post('/create')
    createUser(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.delete(id);
    }

}
