import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivitiesService {

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>
  ) { }
  async create(createActivityDto: CreateActivityDto) {
    const existActivity = await this.activityRepository.findOne(
      {
        where: { description: createActivityDto.description}
      }
    );
    if (existActivity) throw new NotFoundException(`Activity with description ${createActivityDto.description} Already Exist`);
    const newActivity = await this.activityRepository.save(createActivityDto)
    return newActivity;
  }

  async findAll() {
    const listActivities = await this.activityRepository.find()
    if (!listActivities || listActivities.length === 0) throw new NotFoundException("Activities Not Found");
    return listActivities;
  }

  async findOne(id: string) {
    const existActivity = await this.activityRepository.findOne(
      {
        where: { activity_id: id}
      }
    );
    if (!existActivity) throw new NotFoundException(`Activity with id ${id} Not Found`);
    return existActivity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const existingActivity = await this.findOne(id );
    if(!existingActivity) throw new NotFoundException(`Activity with id ${id} Not Found`);

    const updatedActivity = await this.activityRepository.save({...existingActivity,...updateActivityDto });
    return updatedActivity;
  }

  remove(id: string) {
    return `This action removes a #${id} activity`;
  }
}
