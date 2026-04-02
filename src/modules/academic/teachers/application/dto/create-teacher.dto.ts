import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @ApiProperty( {example: "John Doe"} )
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
    @IsString()
    @IsNotEmpty()
    admissionDate: string;
}



    


//   id: uuid("id").primaryKey().defaultRandom(),
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   document: varchar("document", { length: 20 }).notNull().unique(),
//   degree: varchar("degree", { length: 100 }).notNull(),
//   specialization: varchar("specialization", { length: 100 }).notNull(),
//   admissionDate: timestamp("admission_date", { withTimezone: true }).notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
