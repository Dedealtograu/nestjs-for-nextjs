import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UpdatePasswordDto {
  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  currentPassword: string

  @IsString({ message: 'A nova senha deve ser uma string' })
  @IsNotEmpty({ message: 'Nova senha não pode ser vazia' })
  @MinLength(6, { message: 'Nova senha deve ter no mínimo 6 caracteres' })
  newPassword: string
}
