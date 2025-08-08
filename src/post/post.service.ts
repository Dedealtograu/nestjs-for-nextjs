import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { User } from 'src/user/entities/user.entity'
import { createSlugFromText } from 'src/common/utils/create-slug-from-text'

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name)
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      slug: createSlugFromText(dto.title),
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      author,
    })

    const created = await this.postRepository.save(post).catch((err: unknown) => {
      if (err instanceof Error) {
        this.logger.error('Erro ao criar post', err.stack)
      }
      throw new BadRequestException('Erro ao criar post')
    })

    return created
  }

  async findOne(postData: Partial<Post>) {
    const post = await this.postRepository.findOne({
      where: postData,
      relations: ['author'],
    })

    return post
  }

  async findOneByOrFail(postData: Partial<Post>) {
    const post = await this.findOne(postData)

    if (!post) {
      throw new NotFoundException('Post não encontrado')
    }

    return post
  }

  async findOneOwned(postData: Partial<Post>, author: User) {
    const post = await this.postRepository.findOne({
      where: { ...postData, author: { id: author.id } },
      relations: ['author'],
    })

    return post
  }

  async findOneOwnedOrFail(postData: Partial<Post>, author: User) {
    const post = await this.findOneOwned(postData, author)

    if (!post) {
      throw new NotFoundException('Post não encontrado')
    }

    return post
  }

  async findAllOwned(author: User) {
    const posts = await this.postRepository.find({
      where: { author: { id: author.id } },
      order: { createdAt: 'DESC' },
      relations: ['author'],
    })

    return posts
  }
}
