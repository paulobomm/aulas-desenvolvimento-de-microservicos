import { StudentService } from "@academic/students/application/services/student.service";
import { STUDENT_REPOSITORY } from "@academic/students/domain/repositories/student-repository.interface";
import { StudentsController } from "@academic/students/infra/controllers/students.controller";
import { StudentsPublisher } from "@academic/students/infra/messaging/students.publisher";
import { DrizzleStudentRepository } from "@academic/students/infra/repositories/drizzle-student.repository";
import { MessagingModule } from "@messaging/messaging.module";
import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [SharedModule, MessagingModule],
  controllers: [StudentsController],
  providers: [
    StudentService,
    StudentsPublisher,
    DrizzleStudentRepository,
    {
      provide: STUDENT_REPOSITORY,
      useExisting: DrizzleStudentRepository,
    },
  ],
})
export class StudentsModule {}
