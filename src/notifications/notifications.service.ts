import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from 'database/entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepo.create(dto);
    return await this.notificationRepo.save(notification);
  }

  async markAsRead(id: string): Promise<void> {
    const result = await this.notificationRepo
      .createQueryBuilder()
      .update(Notification)
      .set({ isRead: true })
      .where('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }
  }

  async markAllAsRead(): Promise<void> {
    await this.notificationRepo
      .createQueryBuilder()
      .update(Notification)
      .set({ isRead: true })
      .where('isRead = :isRead', { isRead: false })
      .execute();
  }

  async delete(id: string) {
    return await this.notificationRepo.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.notificationRepo
      .createQueryBuilder()
      .delete()
      .where('1=1') // Deletes all notifications
      .execute();
  }
  async findAll(): Promise<Notification[]> {
    return this.notificationRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
