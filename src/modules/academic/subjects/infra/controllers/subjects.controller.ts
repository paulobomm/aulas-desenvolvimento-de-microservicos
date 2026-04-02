import { SubjectDto } from "@academic/subjects/application/dto/subject.dto";
import { SubjectService } from "@academic/subjects/application/services/subject.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";

@ApiTags("subjects")
@ApiBearerAuth()
@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  @ApiOperation({ summary: "Listar disciplinas" })
  async findAll() {
    return this.subjectService.list();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar disciplina por ID" })
  @ApiNotFoundResponse({ description: "Disciplina não encontrada" })
  async findById(@Param("id") id: string) {
    return this.subjectService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar disciplina" })
  async create(@Body() body: SubjectDto) {
    return this.subjectService.create(body);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Atualizar disciplina" })
  @ApiNoContentResponse({ description: "Disciplina atualizada" })
  @ApiNotFoundResponse({ description: "Disciplina não encontrada" })
  async update(@Param("id") id: string, @Body() body: SubjectDto) {
    return this.subjectService.edit(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remover disciplina" })
  @ApiNoContentResponse({ description: "Disciplina removida" })
  @ApiNotFoundResponse({ description: "Disciplina não encontrada" })
  async remove(@Param("id") id: string) {
    return this.subjectService.remove(id);
  }
}
