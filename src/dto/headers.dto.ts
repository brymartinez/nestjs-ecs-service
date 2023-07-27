import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class HeadersDTO {
  @Expose({ name: 'reference-no' })
  @IsString()
  @IsUUID()
  refNo: string;
}
