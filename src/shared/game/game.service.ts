import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { ApiService } from '../api';
import { MapperService } from './mapper.service';

@Injectable()
export class GameService {
  constructor(private apiService: ApiService) {}

}
