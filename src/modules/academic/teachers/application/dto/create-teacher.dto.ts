import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "john@university.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "123.456.789-00" })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ example: "PhD in Computer Science" })
  @IsString()
  @IsNotEmpty()
  degree: string;

  @ApiProperty({ example: "Artificial Intelligence" })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({ example: "2020-01-15" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  admissionDate: Date;
}
//   createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
