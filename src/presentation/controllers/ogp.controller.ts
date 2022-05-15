import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FetchOgpUseCase } from 'src/application/useCases/ogp/fetchOgp.useCase';
import { ConnectTestUseCase } from 'src/application/useCases/ogp/connectTest.useCase';
import { FetchOgpDto } from 'src/presentation/dto/ogp/fetchOgp.dto';
import { User } from '~/domain/user/User';

@ApiTags('Ogp')
@Controller('/ogp')
export class OgpController {
  constructor(
    private readonly fetchOgpUseCase: FetchOgpUseCase,
    private readonly connectTestUseCase: ConnectTestUseCase,
  ) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success to fetch OGP',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Fail to fetch OGP',
  })
  @ApiOperation({ summary: 'URLをもとにサイトのOGPを取得します' })
  async fetchOgp(
    @Query() query: FetchOgpDto,
  ): Promise<{ [key: string]: string }> {
    return await this.fetchOgpUseCase.execute(query.url);
  }

  @Get('/test')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success to fetch OGP',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Fail to fetch OGP',
  })
  @ApiOperation({ summary: 'URLをもとにサイトのOGPを取得します' })
  async test(): Promise<User> {
    return await this.connectTestUseCase.execute();
  }
}
