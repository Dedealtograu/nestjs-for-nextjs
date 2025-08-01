import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  serviceLogin(): string {
    return 'Olá do AuthService!'
  }
}
