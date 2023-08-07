import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { IUseCase } from 'src/global';

import { ERole } from '../../domain/entity/RoleEntity';
import { NotificationRegisterEvent } from '../../domain/events/NotificationRegister/NotificationRegisterEvent';
import { CreateUserDto } from '../../infrastructure/dto/auth.dto';
import { UserCreatorUseCase } from '../user/UserCreator';

@Injectable()
export class RegisterUserUseCase implements IUseCase<CreateUserDto, void> {
  constructor(
    private readonly userCreatorUseCase: UserCreatorUseCase,

    private readonly eventBus: EventBus,
  ) {}

  async execute(data: CreateUserDto): Promise<void> {
    const user = await this.userCreatorUseCase.execute({
      ...data,
      role: ERole.GUEST,
    });

    this.eventBus.publish(
      new NotificationRegisterEvent(user.email, `${user.name}`),
    );
  }
}
