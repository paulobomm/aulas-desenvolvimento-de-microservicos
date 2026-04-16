import { StudentDto } from "@academic/students/application/dto/student.dto";
import { CreateStudentDto } from "@academic/students/application/dto/create-student.dto";
import { UpdateStudentDto } from "@academic/students/application/dto/update-student.dto";
import { StudentService } from "@academic/students/application/services/student.service";
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

@ApiTags("students")
@ApiBearerAuth()
@Controller("students")
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: "Listar estudantes" })
  @ApiQuery({ name: "_page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "_size", required: false, type: Number, example: 10 })
  @ApiOkResponse({ description: "Lista de estudantes paginada" })
  async findAll(
    @Query("_page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("_size", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() req: Request,
  ): Promise<PaginatedResponse<StudentDto>> {
    const basePath = `${req.protocol}://${req.get("host")}/v1/students`;
    return this.studentService.listPaginated({ page, limit }, basePath);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar estudante por ID" })
  @ApiNotFoundResponse({ description: "Estudante não encontrado" })
  @ApiOkResponse({ description: "Estudante encontrado" })
  async findById(@Param("id") id: string): Promise<StudentDto | null> {
    return this.studentService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar estudante" })
  @ApiCreatedResponse({ description: "Estudante criado" })
  async create(@Body() body: CreateStudentDto): Promise<void> {
    return this.studentService.create(body);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Atualizar estudante" })
  @ApiNoContentResponse({ description: "Estudante atualizado" })
  @ApiNotFoundResponse({ description: "Estudante não encontrado" })
  async update(
    @Param("id") id: string,
    @Body() body: UpdateStudentDto,
  ): Promise<void> {
    return this.studentService.edit(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remover estudante" })
  @ApiNoContentResponse({ description: "Estudante removido" })
  @ApiNotFoundResponse({ description: "Estudante não encontrado" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.studentService.remove(id);
  }
}
