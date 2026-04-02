import { StudentDto } from "@academic/students/application/dto/student.dto";
import { StudentService } from "@academic/students/application/services/student.service";
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

@ApiTags("students")
@ApiBearerAuth()
@Controller("students")
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: "Listar estudantes" })
  async findAll() {
    return this.studentService.list();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar estudante por ID" })
  @ApiNotFoundResponse({ description: "Estudante não encontrado" })
  async findById(@Param("id") id: string) {
    return this.studentService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar estudante" })
  async create(@Body() body: StudentDto) {
    return this.studentService.create(body);
  }

  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Atualizar estudante" })
  @ApiNoContentResponse({ description: "Estudante atualizado" })
  @ApiNotFoundResponse({ description: "Estudante não encontrado" })
  async update(@Param("id") id: string, @Body() body: StudentDto) {
    return this.studentService.edit(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remover estudante" })
  @ApiNoContentResponse({ description: "Estudante removido" })
  @ApiNotFoundResponse({ description: "Estudante não encontrado" })
  async remove(@Param("id") id: string) {
    return this.studentService.remove(id);
  }
}
