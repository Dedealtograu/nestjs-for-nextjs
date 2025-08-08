import { PartialType, PickType } from '@nestjs/mapped-types'
import { CreatePostDto } from './create-post.dto'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdatePostDto extends PartialType(PickType(CreatePostDto, ['title', 'coverImage', 'excerpt', 'content'])) {
  @IsOptional()
  @IsBoolean({ message: 'O campo published deve ser um booleano' })
  published?: boolean
}
