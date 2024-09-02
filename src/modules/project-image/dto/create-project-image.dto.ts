import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProjectImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
