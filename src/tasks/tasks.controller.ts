import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from 'src/dto/create.task.dto';
import { JWTAuthGuard } from 'src/guards/jwt.auth.guard';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService) {}

    @ApiOperation({
        summary: 'List all tasks',
        description: 'List\'s all the tasks created in the application'
      })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Get('/')
    getTasks() {
        return this.taskService.getTasks();
    }

    @ApiOperation({
        summary: 'Get task detail ',
        description: 'Provides the details of a given task id'
      })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Get('/:id')
    getTaskDetails(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getTask(id);
    }

    @ApiOperation({
        summary: 'Create task',
        description: 'Creates task with the provided task details'
      })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Post('/create')
    @ApiBody({
        type: CreateTaskDto
    })
    createUser(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @ApiOperation({
        summary: 'Delete task',
        description: 'Delete\'s the task of the provided task id'
      })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.delete(id);
    }

}
