import { ApiProperty } from "@nestjs/swagger"
import { TaskStatus } from "src/enum/task.status.enum"

export class CreateTaskDto {

    @ApiProperty({
        required: false
    })
    uid?: number

    @ApiProperty()
    description: string

    @ApiProperty({
        enum: TaskStatus
    })
    status: TaskStatus
}