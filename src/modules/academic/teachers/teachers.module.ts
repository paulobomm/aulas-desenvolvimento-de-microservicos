import { TeacherService } from "@academic/teachers/application/services/teacher.service";
import { TEACHER_REPOSITORY } from "@academic/teachers/domain/repositories/teacher-repository.interface";
import { TeachersController } from "@academic/teachers/infra/controllers/teachers.controller";
import { TeachersConsumer } from "@academic/teachers/infra/messaging/teachers.consumer";
import { TeachersPublisher } from "@academic/teachers/infra/messaging/teachers.publisher";
import { DrizzleTeacherRepository } from "@academic/teachers/infra/repositories/drizzle-teacher.repository";
import { Module } from "@nestjs/common";
import { MessagingModule } from "@messaging/messaging.module";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [SharedModule, MessagingModule],
  controllers: [TeachersController],
  providers: [
    TeacherService,
    TeachersPublisher,
    TeachersConsumer,
    DrizzleTeacherRepository,
    {
      provide: TEACHER_REPOSITORY,
      useExisting: DrizzleTeacherRepository,
    },
  ],
})
export class TeachersModule {}