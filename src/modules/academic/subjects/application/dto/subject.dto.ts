import { ApiProperty } from "@nestjs/swagger";
import type { Subject } from "@academic/subjects/domain/models/subject.entity";

export class SubjectDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public code: string;

  @ApiProperty()
  public workload: number;

  @ApiProperty()
  public description: string;

  private constructor(
    name: string,
    code: string,
    workload: number,
    description: string,
  ) {
    this.name = name;
    this.code = code;
    this.workload = workload;
    this.description = description;
  }

  public static from(subject: Subject | null): SubjectDto | null {
    if (!subject) return null;
    return new SubjectDto(
      subject.name,
      subject.code,
      subject.workload,
      subject.description,
    );
  }
}
