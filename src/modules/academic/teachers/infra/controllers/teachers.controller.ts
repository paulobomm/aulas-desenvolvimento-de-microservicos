import { TeacherDto } from "@academic/teachers/application/dto/teacher.dto";
import { CreateTeacherDto } from "@academic/teachers/application/dto/create-teacher.dto";
import { UpdateTeacherDto } from "@academic/teachers/application/dto/update-teacher.dto";
import { TeacherService } from "@academic/teachers/application/services/teacher.service";
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

@ApiTags("teachers")
@ApiBearerAuth()
@Controller("teachers")
export class TeachersController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  @ApiOperation({ summary: "Listar professores" })
  @ApiQuery({ name: "_page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "_size", required: false, type: Number, example: 10 })
  @ApiOkResponse({ description: "Lista de professores paginada" })
  async findAll(
    @Query("_page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("_size", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() req: Request,
  ): Promise<PaginatedResponse<TeacherDto>> {
    const basePath = `${req.protocol}://${req.get("host")}/v1/teachers`;
    return this.teacherService.listPaginated({ page, limit }, basePath);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar professor por ID" })
  @ApiNotFoundResponse({ description: "Professor não encontrado" })
  @ApiOkResponse({ description: "Professor encontrado" })
  async findById(@Param("id") id: string): Promise<TeacherDto | null> {
    return this.teacherService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar professor" })
  @ApiCreatedResponse({ description: "Professor criado" })
  async create(@Body() body: CreateTeacherDto): Promise<void> {
    return this.teacherService.create(body);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Atualizar professor" })
  @ApiNoContentResponse({ description: "Professor atualizado" })
  @ApiNotFoundResponse({ description: "Professor não encontrado" })
  async update(
    @Param("id") id: string,
    @Body() body: UpdateTeacherDto,
  ): Promise<void> {
    return this.teacherService.edit(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remover professor" })
  @ApiNoContentResponse({ description: "Professor removido" })
  @ApiNotFoundResponse({ description: "Professor não encontrado" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.teacherService.remove(id);
  }
}
