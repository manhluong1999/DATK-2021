import { GUARDS } from './../../@core/constants/guards.enum';
import { Public } from './../../@core/constants/decorators.constants';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@ApiBearerAuth('JWT')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public([GUARDS.PUBLIC_GUARD])
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }

}
