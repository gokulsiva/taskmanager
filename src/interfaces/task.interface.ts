import { TaskStatus } from "src/enum/task.status.enum";

export interface Task {
    id: number
    uid?: number
    description: string
    status: TaskStatus
}