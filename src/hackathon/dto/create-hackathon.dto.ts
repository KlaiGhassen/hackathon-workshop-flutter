import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HackathonStatus } from '../entities/hackathon.entity';

export class CreateHackathonDto {
  @ApiProperty({
    description: 'The title of the hackathon',
    example: 'AI Innovation Hackathon',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the hackathon',
    example: 'Build the next generation of AI applications',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The image URL of the hackathon',
    example: '/uploads/hackathon-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'The status of the hackathon',
    enum: HackathonStatus,
    example: HackathonStatus.UPCOMING,
    required: false,
  })
  @IsEnum(HackathonStatus)
  @IsOptional()
  status?: HackathonStatus;
}
