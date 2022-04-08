import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { Battle } from '../db';
import { GameService } from './game.service';

@Injectable()
export class MapperService {
  /**
   * Map a list of numeric card_detail_ids to full CardDetails objects
   *
   * @param {number[]} cardDetailIds list of numeric card details ids, usually card_detail_id on api responses
   * @param {CardDetailDto[]} allCards list of all cards in the game, returned by getDetails on the api
   * @returns {CardDetailDto[]} the card details for the given ids
   */
  static mapCardDetailIdsToCards(
    cardDetailIds: number[],
    allCards: any,
  ): any {
    return _.chain(cardDetailIds)
      .map((id) => allCards.find((card) => card.id === id))
      .value();
  }

  static mapCardMana(card: any , level: number): number {
    let mana = card.stats.mana;

    if (Array.isArray(mana)) {
      mana = mana[level];
    }

    return mana;
  }


  static mapLeagueName(rating: number, power?: number): string {
    // TODO: could cache this, minor performance issue (cpu)
    const sortedLeagues = _.chain(GameService.LEAGUES)
      .sortBy('min_rating')
      .reverse()
      .value();

    for (const league of sortedLeagues) {
      if (
        rating >= league.min_rating &&
        (!power || power >= league.min_power)
      ) {
        return league.name;
      }
    }
    return _.last(sortedLeagues).name;
  }


  static mapRarityNumberToString(rarity: number): string {
    switch (rarity) {
      case 1:
        return 'Common';
      case 2:
        return 'Rare';
      case 3:
        return 'Epic';
      case 4:
        return 'Legendary';
      default:
        return 'Unknown';
    }
  }

  static mapColorToSplinter(color: string) {
    switch (color) {
      case 'Red':
        return 'Fire';
      case 'Blue':
        return 'Water';
      case 'Green':
        return 'Earth';
      case 'White':
        return 'Life';
      case 'Black':
        return 'Death';
      case 'Gold':
        return 'Dragon';
      case 'Gray':
        return 'Neutral';
      default:
        return 'Unknown';
    }
  }

  static mapEditionString(editionIndex: number) {
    switch (editionIndex) {
      case 0:
        return 'Alpha';
      case 1:
        return 'Beta';
      case 2:
        return 'Promo';
      case 3:
        return 'Reward';
      case 4:
        return 'Untamed';
      case 5:
        return 'Dice';
      case 7:
        return 'Chaos';
      default:
        return 'Unknown';
    }
  }
}
