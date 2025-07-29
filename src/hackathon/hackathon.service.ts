import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { Hackathon, HackathonDocument } from './entities/hackathon.entity';

@Injectable()
export class HackathonService {
  constructor(
    @InjectModel(Hackathon.name) private hackathonModel: Model<HackathonDocument>,
  ) {}

  async create(createHackathonDto: CreateHackathonDto): Promise<Hackathon> {
    const createdHackathon = new this.hackathonModel(createHackathonDto);
    return createdHackathon.save();
  }

  async participate(hackathonId: string, userId: string): Promise<Hackathon> {
    const hackathon = await this.hackathonModel.findById(hackathonId).exec();
    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${hackathonId} not found`);
    }

    // Check if hackathon is open for participation
    if (hackathon.status !== 'upcoming' && hackathon.status !== 'ongoing') {
      throw new BadRequestException('Hackathon is not open for participation');
    }

    // Add user to participants if not already participating
    if (!hackathon.participants) {
      hackathon.participants = [];
    }

    if (hackathon.participants.includes(userId)) {
      throw new BadRequestException('User is already participating in this hackathon');
    }

    hackathon.participants.push(userId);
    return hackathon.save();
  }

  async findAll(): Promise<Hackathon[]> {
    return this.hackathonModel.find().exec();
  }

  async findOne(id: string): Promise<Hackathon> {
    const hackathon = await this.hackathonModel.findById(id).exec();
    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }
    return hackathon;
  }

  async update(id: string, updateHackathonDto: UpdateHackathonDto): Promise<Hackathon> {
    const updatedHackathon = await this.hackathonModel
      .findByIdAndUpdate(id, updateHackathonDto, { new: true })
      .exec();
    if (!updatedHackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }
    return updatedHackathon;
  }

  async remove(id: string): Promise<Hackathon> {
    const deletedHackathon = await this.hackathonModel.findByIdAndDelete(id).exec();
    if (!deletedHackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }
    return deletedHackathon;
  }
}
