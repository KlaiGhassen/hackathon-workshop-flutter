import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type HackathonDocument = Hackathon & Document;

export enum HackathonStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Hackathon {
  @ApiProperty({
    description: 'The unique identifier of the hackathon',
    example: '64f8a1b2c3d4e5f6a7b8c9d0',
  })
  _id: string;

  @ApiProperty({
    description: 'The title of the hackathon',
    example: 'AI Innovation Hackathon',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'The description of the hackathon',
    example: 'Build the next generation of AI applications',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'The image URL of the hackathon',
    example: '/uploads/hackathon-image.jpg',
  })
  @Prop()
  image: string;

  @ApiProperty({
    description: 'The status of the hackathon',
    enum: HackathonStatus,
    example: HackathonStatus.UPCOMING,
  })
  @Prop({ 
    type: String, 
    enum: HackathonStatus, 
    default: HackathonStatus.UPCOMING 
  })
  status: HackathonStatus;

  @ApiProperty({
    description: 'Array of user IDs participating in the hackathon',
    example: ['64f8a1b2c3d4e5f6a7b8c9d1'],
    type: [String],
  })
  @Prop({ type: [String], default: [] })
  participants: string[];

  @ApiProperty({
    description: 'The creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}

export const HackathonSchema = SchemaFactory.createForClass(Hackathon);
