import { SubjectService } from "@academic/subjects/application/services/subject.service";
import { SUBJECT_REPOSITORY } from "@academic/subjects/domain/repositories/subject-repository.interface";
import { SubjectsController } from "@academic/subjects/infra/controllers/subjects.controller";
import { SubjectsPublisher } from "@academic/subjects/infra/messaging/subjects.publisher";
import { DrizzleSubjectRepository } from "@academic/subjects/infra/repositories/drizzle-subject.repository";
import { Module } from "@nestjs/common";
import { MessagingModule } from "@messaging/messaging.module";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [SharedModule, MessagingModule],
  controllers: [SubjectsController],
  providers: [
    SubjectService,
    SubjectsPublisher,
    DrizzleSubjectRepository,
    {
      provide: SUBJECT_REPOSITORY,
      useExisting: DrizzleSubjectRepository,
    },
  ],
})
export class SubjectsModule {}