import { SubjectDto } from "@academic/subjects/application/dto/subject.dto";
import { CreateSubjectDto } from "@academic/subjects/application/dto/create-subject.dto";
import { UpdateSubjectDto } from "@academic/subjects/application/dto/update-subject.dto";
import { Subject } from "@academic/subjects/domain/models/subject.entity";
import {
  SUBJECT_REPOSITORY,
  type SubjectRepository,
} from "@academic/subjects/domain/repositories/subject-repository.interface";
import { SubjectsPublisher } from "@academic/subjects/infra/messaging/subjects.publisher";
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  PaginatedResponse,
  PaginatedResponseBuilder,
  PaginationParams,
} from "@shared/infra/http/paginated-response";

@Injectable()
export class SubjectService {
  constructor(
    @Inject(SUBJECT_REPOSITORY)
    private readonly subjectRepository: SubjectRepository,
    private readonly subjectsPublisher: SubjectsPublisher,
  ) {}

  async create(dto: CreateSubjectDto): Promise<void> {
    const existing = await this.subjectRepository.findByCode(dto.code);

    if (existing) {
      throw new ConflictException("Code already registered");
    }

    const subject = Subject.restore({
      name: dto.name,
      code: dto.code,
      workload: dto.workload,
      description: dto.description,
    });

    await this.subjectRepository.create(subject!);
    this.subjectsPublisher.publishCreated(subject!);
  }

  async edit(id: string, dto: UpdateSubjectDto): Promise<void> {
    const subject = await this.subjectRepository.findById(id);

    if (!subject) {
      throw new NotFoundException("Subject not found");
    }

    if (dto.code && dto.code !== subject.code) {
      const existing = await this.subjectRepository.findByCode(dto.code);

      if (existing) {
        throw new ConflictException("Code already registered");
      }
    }

    if (dto.name) subject.withName(dto.name);
    if (dto.code) subject.withCode(dto.code);
    if (dto.workload) subject.withWorkload(dto.workload);
    if (dto.description) subject.withDescription(dto.description);

    await this.subjectRepository.update(subject);
    this.subjectsPublisher.publishUpdated(subject);
  }

  async remove(id: string): Promise<void> {
    await this.subjectRepository.delete(id);

    this.subjectsPublisher.publishDeleted(id);
  }

  async list(): Promise<SubjectDto[]> {
    const response = await this.subjectRepository.findAll();
    return response.map((row) => SubjectDto.from(row)!);
  }

  async listPaginated(
    params: PaginationParams,
    basePath: string,
  ): Promise<PaginatedResponse<SubjectDto>> {
    const skip = (params.page - 1) * params.limit;
    const allSubjects = await this.subjectRepository.findAll();

    const totalItems = allSubjects.length;
    const paginatedSubjects = allSubjects
      .slice(skip, skip + params.limit)
      .map((row) => SubjectDto.from(row)!);

    return new PaginatedResponseBuilder(
      paginatedSubjects,
      totalItems,
      params.page,
      params.limit,
      basePath,
    ).build();
  }

  async findById(id: string): Promise<SubjectDto | null> {
    const response = await this.subjectRepository.findById(id);
    return SubjectDto.from(response);
  }

  async findByCode(code: string): Promise<SubjectDto | null> {
    const response = await this.subjectRepository.findByCode(code);
    return SubjectDto.from(response);
  }
}