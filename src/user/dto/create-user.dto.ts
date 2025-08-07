import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string
  @IsEmail({}, { message: 'Email inválido' })
  email: string
  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password: string
}
