import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    format: 'password',
  })
  password: string;

  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  lastName: string;
}
