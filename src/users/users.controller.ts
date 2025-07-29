import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User data',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the user',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          description: 'The email of the user',
          example: 'john@example.com',
        },
        age: {
          type: 'number',
          description: 'The age of the user',
          example: 30,
        },
        isActive: {
          type: 'boolean',
          description: 'Whether the user is active',
          example: true,
        },
      },
      required: ['name', 'email'],
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'Login credentials',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The email of the user',
          example: 'john@example.com',
        },
        pwd: {
          type: 'string',
          description: 'The password of the user',
          example: 'password123',
        },
      },
      required: ['email', 'pwd'],
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful', type: User })
  @ApiResponse({ status: 404, description: 'Invalid email or password' })
  login(@Body() loginDto: { email: string; pwd: string }) {
    console.log(loginDto);
    return this.usersService.login(loginDto.email, loginDto.pwd);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: '64f8a1b2c3d4e5f6a7b8c9d0' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '64f8a1b2c3d4e5f6a7b8c9d0' })
  @ApiBody({
    description: 'User update data',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the user',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          description: 'The email of the user',
          example: 'john@example.com',
        },
        age: {
          type: 'number',
          description: 'The age of the user',
          example: 30,
        },
        isActive: {
          type: 'boolean',
          description: 'Whether the user is active',
          example: true,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '64f8a1b2c3d4e5f6a7b8c9d0' })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
} 