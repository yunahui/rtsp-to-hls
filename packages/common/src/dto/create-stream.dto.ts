import { IsOptional, IsPort, IsString } from 'class-validator';

export class CreateStreamDto {
  @IsString()
  host!: string;

  @IsPort()
  port!: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
