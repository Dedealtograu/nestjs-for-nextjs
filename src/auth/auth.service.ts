import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  serviceLogin(loginDto: LoginDto) {
    return loginDto
  }
}
