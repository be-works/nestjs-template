import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
