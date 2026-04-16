import { SubjectDto } from "@academic/subjects/application/dto/subject.dto";
import { SubjectService } from "@academic/subjects/application/services/subject.service";
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import { Request } from "express";

import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { PaginatedResponse } from "@shared/infra/http/paginated-response";

@ApiTags("subjects")
@ApiBearerAuth()
@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  @ApiOperation({ summary: "Listar disciplinas" })
  @ApiQuery({ name: "_page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "_size", required: false, type: Number, example: 10 })
  @ApiOkResponse({ description: "Lista de disciplinas paginada" })
  async findAll(
    @Query("_page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("_size", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() req: Request,
  ): Promise<PaginatedResponse<SubjectDto>> {
    const basePath = `${req.protocol}://${req.get("host")}/v1/subjects`;
    return this.subjectService.listPaginated({ page, limit }, basePath);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar disciplina por ID" })
  @ApiNotFoundResponse({ description: "Disciplina não encontrada" })
  @ApiOkResponse({ description: "Disciplina encontrada" })
  async findById(@Param("id") id: string): Promise<SubjectDto | null> {
    return this.subjectService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar disciplina" })
  @ApiCreatedResponse({ description: "Disciplina criada" })
  async create(@Body() body: SubjectDto): Promise<void> {
    return this.subjectService.create(body);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Atualizar disciplina" })
  @ApiNoContentResponse({ description: "Disciplina atualizada" })
  @ApiNotFoundResponse({ description: "Disciplina não encontrada" })
  async update(@Param("id") id: string, @Body() body: SubjectDto): Promise<void> {
    return this.subjectService.edit(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remover disciplina" })
  @ApiNoContentResponse({ description: "Disciplina removida" })
  @ApiNotFoundResponse({ description: "Disciplina não encontrada" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.subjectService.remove(id);
  }
}
