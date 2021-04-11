import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskStatus } from 'src/enum/task.status.enum';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskRepositoryFake } from './task.repository.fake';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let taskService: TasksService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: TaskRepositoryFake
        }
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task))
  });

  it('TaskService should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('TaskRepo should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  it('Find all tasks', async () => {
    const taskRepositoryFindSpy = jest
      .spyOn(taskRepository, 'find')
      .mockResolvedValue([]);

    const findResult = await taskService.getTasks();

    expect(taskRepositoryFindSpy).toHaveBeenCalledTimes(1);
    expect(findResult).toStrictEqual([]);
  });

  it('Find task with id', async () => {
    const task = new Task();
    task.description = 'test';
    task.status = TaskStatus.PENDIND;
    task.id = 1;

    const taskRepositoryFindOneOrFailSpy = jest
      .spyOn(taskRepository, 'findOneOrFail')
      .mockResolvedValue(task);
    
    const findResult = await taskService.getTask(1);

    expect(taskRepositoryFindOneOrFailSpy).toBeCalledWith({id: 1});
    expect(taskRepositoryFindOneOrFailSpy).toHaveBeenCalledTimes(1);
    expect(findResult).toStrictEqual(task);
  });

  it('Delete task with id', async() => {
    const taskRepositoryDeleteSpy = jest
      .spyOn(taskRepository, 'delete')
    
    await taskService.delete(1);
    expect(taskRepositoryDeleteSpy).toBeCalledWith({id: 1});
    expect(taskRepositoryDeleteSpy).toHaveBeenCalledTimes(1);
  })

});
