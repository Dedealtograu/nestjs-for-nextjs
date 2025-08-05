import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { ConfigService } from '@nestjs/config'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    console.log(process.env.TESTE)
    return `Olá do controller User com id: ${id}`
  }
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }
}
