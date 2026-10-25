import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  findAll(completed?: boolean) {
    return this.prisma.task.findMany({
      where: completed !== undefined ? { completed } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  async update(id: string, dto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException('Tarefa não encontrada');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.task.delete({ where: { id } });
      return { deleted: true };
    } catch {
      throw new NotFoundException('Tarefa não encontrada');
    }
  }
}