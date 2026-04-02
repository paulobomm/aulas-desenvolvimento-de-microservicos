import { SubjectDto } from "@academic/subjects/application/dto/subject.dto";
import { Subject } from "@academic/subjects/domain/models/subject.entity";
import {
  SUBJECT_REPOSITORY,
  type SubjectRepository,
} from "@academic/subjects/domain/repositories/subject-repository.interface";
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PaginatedResponse, PaginatedResponseBuilder, PaginationParams } from "@shared/infra/http/paginated-response";

@Injectable()
export class SubjectService {
  constructor(
    @Inject(SUBJECT_REPOSITORY)
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async create(dto: SubjectDto): Promise<void> {
    const existing = await this.subjectRepository.findByCode(dto.code);

    if (existing) {
      throw new ConflictException("Code already registered");
    }

    const subject = Subject.restore(dto);
    await this.subjectRepository.create(subject!);
  }

  async edit(id: string, dto: SubjectDto): Promise<void> {
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

    subject
      .withName(dto.name)
      .withCode(dto.code)
      .withWorkload(dto.workload)
      .withDescription(dto.description);

    await this.subjectRepository.update(subject);
  }

  async remove(id: string): Promise<void> {
    await this.subjectRepository.delete(id);
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
