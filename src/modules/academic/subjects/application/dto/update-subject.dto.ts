import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateSubjectDto {
  @ApiProperty({ example: "Português", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: "PORT", required: false })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ example: 60, required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  workload?: number;

  @ApiProperty({ example: "Matéria de português", required: false })
  @IsString()
  @IsOptional()
  description?: string;
}