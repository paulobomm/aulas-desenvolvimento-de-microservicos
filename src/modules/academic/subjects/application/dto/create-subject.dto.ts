import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateSubjectDto {
  @ApiProperty({ example: "Português" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Linguas" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 60 })
  @IsInt()
  @Min(1)
  workload: number;

  @ApiProperty({ example: "Matéria de linguas em português" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
