import { AssetDto } from '../../api';
import { Asset } from '../../db';

export class AssetMapper {
  static mapToAsset(assetDto: AssetDto): Asset {
    return {
      attack: assetDto.metadata?.attack,
      createdAt: assetDto.created_at,
      description: assetDto.description,
      effect: assetDto.metadata?.effect,
      god: assetDto.metadata?.god,
      health: assetDto.metadata?.health,
      id: assetDto.id,
      image: assetDto.metadata?.image,
      mana: assetDto.metadata?.mana,
      name: assetDto.metadata?.name,
      proto: assetDto.metadata?.proto,
      quality: assetDto.metadata?.quality,
      rarity: assetDto.metadata?.rarity,
      set: assetDto.metadata?.set,
      status: assetDto.status,
      token_address: assetDto.token_address,
      token_id: assetDto.token_id,
      tribe: assetDto.metadata?.tribe,
      type: assetDto.metadata?.type,
      updatedAt: assetDto.updated_at,
      uri: assetDto.uri,
      user: assetDto.user,
    };
  }
}
