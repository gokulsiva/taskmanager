import { ApiProperty } from "@nestjs/swagger"
import { TaskStatus } from "src/enum/task.status.enum"

export class CreateTaskDto {

    @ApiProperty()
    id: number

    @ApiProperty()
    uid?: number

    @ApiProperty()
    description: string

    @ApiProperty()
    status: TaskStatus
}