import { ApiProperty } from "@nestjs/swagger";
import type { Teacher } from "@academic/teachers/domain/models/teacher.entity";

export class TeacherDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public document: string;

  @ApiProperty()
  public degree: string;

  @ApiProperty()
  public specialization: string;

  @ApiProperty()
  public admissionDate: Date;

  private constructor(
    name: string,
    email: string,
    document: string,
    degree: string,
    specialization: string,
    admissionDate: Date,
  ) {
    this.name = name;
    this.email = email;
    this.document = document;
    this.degree = degree;
    this.specialization = specialization;
    this.admissionDate = admissionDate;
  }

  public static from(teacher: Teacher | null): TeacherDto | null {
    if (!teacher) return null;
    return new TeacherDto(
      teacher.name,
      teacher.email,
      teacher.document,
      teacher.degree,
      teacher.specialization,
      teacher.admissionDate,
    );
  }
}
