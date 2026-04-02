import { TeacherDto } from "@academic/teachers/application/dto/teacher.dto";
import { TeacherService } from "@academic/teachers/application/services/teacher.service";
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

@ApiTags("teachers")
@ApiBearerAuth()
@Controller("teachers")
export class TeachersController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  @ApiOperation({ summary: "Listar professores" })
  async findAll() {
    return this.teacherService.list();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar professor por ID" })
  @ApiNotFoundResponse({ description: "Professor não encontrado" })
  async findById(@Param("id") id: string) {
    return this.teacherService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar professor" })
  async create(@Body() body: TeacherDto) {
    return this.teacherService.create(body);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Atualizar professor" })
  @ApiNoContentResponse({ description: "Professor atualizado" })
  @ApiNotFoundResponse({ description: "Professor não encontrado" })
  async update(@Param("id") id: string, @Body() body: TeacherDto) {
    return this.teacherService.edit(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remover professor" })
  @ApiNoContentResponse({ description: "Professor removido" })
  @ApiNotFoundResponse({ description: "Professor não encontrado" })
  async remove(@Param("id") id: string) {
    return this.teacherService.remove(id);
  }
}
