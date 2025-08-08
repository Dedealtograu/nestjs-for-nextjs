import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator'

export class CreatePostDto {
  @IsString({ message: 'O campo title deve ser uma string' })
  @Length(10, 150, { message: 'O campo title deve ter entre 10 e 150 caracteres' })
  title: string

  @IsString({ message: 'O campo excerpt deve ser uma string' })
  @Length(10, 200, { message: 'O campo excerpt deve ter entre 10 e 200 caracteres' })
  excerpt: string

  @IsString({ message: 'O campo content deve ser uma string' })
  @IsNotEmpty({ message: 'O campo content deve ser preenchido' })
  content: string

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'O campo coverImage deve ser uma URL' })
  coverImage: string
}
