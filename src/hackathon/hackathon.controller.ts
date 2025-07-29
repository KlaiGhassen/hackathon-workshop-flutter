import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { HackathonService } from './hackathon.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { Hackathon } from './entities/hackathon.entity';

@ApiTags('hackathons')
@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hackathon' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Hackathon data with optional image upload',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the hackathon',
          example: 'AI Innovation Hackathon',
        },
        description: {
          type: 'string',
          description: 'The description of the hackathon',
          example: 'Build the next generation of AI applications',
        },
        status: {
          type: 'string',
          enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
          description: 'The status of the hackathon',
          example: 'upcoming',
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Hackathon image file (jpg, jpeg, png, gif, webp)',
        },
      },
      required: ['title', 'description'],
    },
  })
  @ApiResponse({ status: 201, description: 'Hackathon created successfully', type: Hackathon })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createHackathonDto: CreateHackathonDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Hackathon> {
    if (file) {
      createHackathonDto.image = `/uploads/${file.filename}`;
    }
    return this.hackathonService.create(createHackathonDto);
  }

  @Post(':id/participate')
  @ApiOperation({ summary: 'Participate in a hackathon' })
  @ApiParam({ name: 'id', description: 'Hackathon ID', example: '64f8a1b2c3d4e5f6a7b8c9d0' })
  @ApiBody({
    description: 'User participation data',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'The ID of the user participating',
          example: '64f8a1b2c3d4e5f6a7b8c9d1',
        },
      },
      required: ['userId'],
    },
  })
  @ApiResponse({ status: 200, description: 'Successfully participated in hackathon', type: Hackathon })
  @ApiResponse({ status: 404, description: 'Hackathon not found' })
  @ApiResponse({ status: 400, description: 'Bad request - hackathon not open for participation or user already participating' })
  participate(@Param('id') id: string, @Body() participationDto: { userId: string }) {
    return this.hackathonService.participate(id, participationDto.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hackathons' })
  @ApiResponse({ status: 200, description: 'List of all hackathons', type: [Hackathon] })
  findAll(): Promise<Hackathon[]> {
    return this.hackathonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hackathon by ID' })
  @ApiParam({ name: 'id', description: 'Hackathon ID', example: '64f8a1b2c3d4e5f6a7b8c9d0' })
  @ApiResponse({ status: 200, description: 'Hackathon found', type: Hackathon })
  @ApiResponse({ status: 404, description: 'Hackathon not found' })
  findOne(@Param('id') id: string): Promise<Hackathon> {
    return this.hackathonService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hackathon' })
  @ApiParam({ name: 'id', description: 'Hackathon ID', example: '64f8a1b2c3d4e5f6a7b8c9d0' })
  @ApiBody({
    description: 'Hackathon update data',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the hackathon',
          example: 'AI Innovation Hackathon',
        },
        description: {
          type: 'string',
          description: 'The description of the hackathon',
          example: 'Build the next generation of AI applications',
        },
        image: {
          type: 'string',
          description: 'The image URL of the hackathon',
          example: '/uploads/hackathon-image.jpg',
        },
        status: {
          type: 'string',
          enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
          description: 'The status of the hackathon',
          example: 'ongoing',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Hackathon updated successfully', type: Hackathon })
  @ApiResponse({ status: 404, description: 'Hackathon not found' })
  update(@Param('id') id: string, @Body() updateHackathonDto: UpdateHackathonDto): Promise<Hackathon> {
    return this.hackathonService.update(id, updateHackathonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hackathon' })
  @ApiParam({ name: 'id', description: 'Hackathon ID', example: '64f8a1b2c3d4e5f6a7b8c9d0' })
  @ApiResponse({ status: 200, description: 'Hackathon deleted successfully', type: Hackathon })
  @ApiResponse({ status: 404, description: 'Hackathon not found' })
  remove(@Param('id') id: string): Promise<Hackathon> {
    return this.hackathonService.remove(id);
  }
}
