import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interception.filter';
import { PositiveIntPipe } from 'src/pipes/positiveInt.pipe';

import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCat() {
    console.log('all cats');
    return 'all cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  patchCat() {
    return;
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
