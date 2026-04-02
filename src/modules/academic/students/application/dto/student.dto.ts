import { ApiProperty } from "@nestjs/swagger";
import type { Student } from "@academic/students/domain/models/student.entity";

export class StudentDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public document: string;

  @ApiProperty()
  public registration: string;

  private constructor(
    name: string,
    email: string,
    document: string,
    registration: string,
  ) {
    this.name = name;
    this.email = email;
    this.document = document;
    this.registration = registration;
  }

  public static from(student: Student | null): StudentDto | null {
    if (!student) return null;
    return new StudentDto(
      student.name,
      student.email,
      student.document,
      student.registration,
    );
  }
}
