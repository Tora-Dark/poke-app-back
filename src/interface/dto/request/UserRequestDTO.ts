import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class UserRequestDTO {
  // Optional name field with validation if provided
  @IsOptional()
  @IsString({ message: "Name must be a string if provided." })
  name?: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

 
}
