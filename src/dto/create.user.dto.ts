import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

    @ApiProperty()
    uid: number

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}