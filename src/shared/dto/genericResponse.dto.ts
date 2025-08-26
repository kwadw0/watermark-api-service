import { ApiProperty } from '@nestjs/swagger';

export class GenericResponseDto<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: any;

  @ApiProperty({ type: () => Object, isArray: false, nullable: true })
  data: T | null;
}
