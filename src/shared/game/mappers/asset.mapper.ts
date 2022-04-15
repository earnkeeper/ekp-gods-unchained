import { AssetDto } from '../../api';
import { Asset } from '../../db';

export class AssetMapper {
  static mapToAsset(assetDto: AssetDto): Asset {
    return {
      id: assetDto.token_id,
      proto: assetDto.metadata?.proto,
      quality: assetDto.metadata?.quality,
      status: assetDto.status,
      updatedAt: assetDto.updated_at,
    };
  }
}
