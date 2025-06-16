import { IsNotEmpty, IsString } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
