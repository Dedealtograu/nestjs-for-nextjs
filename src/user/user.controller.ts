import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { ConfigService } from '@nestjs/config'
import { UserService } from './user.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRespnseDto } from './dto/user-response.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id', CustomParseIntPipe) id: number) {
    console.log(req.user.id)
    return `Olá do controller User com id: ${id}`
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto)

    return new UserRespnseDto(user)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(req.user.id, dto)

    return new UserRespnseDto(user)
  }
}
