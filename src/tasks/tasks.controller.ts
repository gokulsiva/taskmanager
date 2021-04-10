import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from 'src/dto/create.task.dto';
import { TaskStatus } from 'src/enum/task.status.enum';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService) {}

    @Get('/')
    getTasks() {
        return this.taskService.getTasks();
    }

    @Get('/:id')
    getTaskDetails(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getTask(id);
    }

    @Post('/create')
    @ApiBody({
        type: CreateTaskDto
    })
    createUser(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.delete(id);
    }

}
