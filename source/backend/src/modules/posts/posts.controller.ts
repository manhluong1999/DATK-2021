import { CreatePostDto } from './dto/createPost.dto';
import { FindAllQuery } from './dto/find-all.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { GUARDS } from '../../@core/constants/guards.enum';
import { Public } from '../../@core/constants/decorators.constants';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Post,
} from '@nestjs/common';
import { PostService } from './posts.service';

@ApiBearerAuth('JWT')
@Controller()
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Public([GUARDS.PUBLIC_GUARD])
  @Post()
  async create(@Body() data: CreatePostDto) {
    return await this.postService.create(data);
  }
  @Public([GUARDS.PUBLIC_GUARD])
  @Get(':uid')
  async findAll(@Param('uid') uid: string, @Query() query: FindAllQuery) {
    return this.postService.findAll(uid, query);
  }

  @Public([GUARDS.PUBLIC_GUARD])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return await this.postService.update(id, data);
  }

  @Public([GUARDS.PUBLIC_GUARD])
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.postService.delete(id);
  }
}
