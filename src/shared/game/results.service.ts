import { ApmService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { ApiService } from '../api';
import { Battle, BattleRepository } from '../db';
import { GameService } from './game.service';
import { MapperService } from './mapper.service';

const FREE_DAYS_TO_FETCH = 1;

@Injectable()
export class ResultsService {
  constructor(
    private apiService: ApiService,
    private apmService: ApmService,
    private battleRepository: BattleRepository,
    private gameService: GameService,
  ) {}

  async getTeamResults(
    manaCap: number,
    ruleset: string,
    leagueName: string,
    subscribed: boolean,
  ): Promise<{ teams: TeamResults[]; battles: Battle[] }> {
    const tx = this.apmService.startTransaction({
      name: 'PlannerService',
      op: 'getViableTeams',
    });

    const fetchSince = !subscribed
      ? moment().subtract(FREE_DAYS_TO_FETCH, 'days').unix()
      : 0;

    const sp1 = tx?.startChild({
      op: 'readBattles',
      data: {
        manaCap,
        ruleset,
        subscribed,
      },
    });

    const battles = await this.battleRepository.findBattleByManaCap(
      manaCap,
      ruleset,
      leagueName,
      fetchSince,
    );

    tx?.setData('battleCount', battles.length);

    sp1?.finish();

    const sp2 = tx?.startChild({
      op: 'fetchCardDetails',
    });

    

    

    sp2?.finish();

    const sp4 = tx?.startChild({
      op: 'computeTeams',
    });

    const viableTeams: Record<string, TeamResults> = {};

    const teams = _.values(viableTeams);

    tx?.setData('teamCount', teams.length);

    sp4?.finish();

    tx?.finish();

    return { teams, battles };
  }


 
   
}

export type TeamResults = {
  readonly id: string;
  battles: number;
  wins: number;
  readonly summoner: TeamMonster;
  readonly monsters: TeamMonster[];
};

export type TeamMonster = Readonly<{
  cardDetailId: number;
  level: number;
  mana: number;
  name: string;
  edition: string;
  splinter: string;
}>;
