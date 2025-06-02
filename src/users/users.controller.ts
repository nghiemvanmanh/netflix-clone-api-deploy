import {
  Controller,
  Post,
  Body,
  Request,
  Param,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/custompublic';
import { User } from 'database/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from 'src/auth/guard/user.guard';
import { AdminGuard } from 'src/auth/guard/admin.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post()
  async register(@Body() newUSer: CreateUserDto): Promise<User> {
    return await this.usersService.register(newUSer);
  }

  @UseGuards(UserGuard)
  @UseGuards(AdminGuard)
  @Put()
  async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUser);
  }

  @UseGuards(AdminGuard)
  @Delete()
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
