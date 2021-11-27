import { UpdatePostDto } from './dto/updatePost.dto';
import { GUARDS } from '../../@core/constants/guards.enum';
import { Public } from '../../@core/constants/decorators.constants';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PostService } from './posts.service';

@ApiBearerAuth('JWT')
@Controller()
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Public([GUARDS.PUBLIC_GUARD])
  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Public([GUARDS.PUBLIC_GUARD])
  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() data: UpdatePostDto,
  ) {
  }
}
