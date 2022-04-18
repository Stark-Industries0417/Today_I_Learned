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
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PositiveIntPipe } from 'src/pipes/positiveInt.pipe';

import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  getAllCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
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
