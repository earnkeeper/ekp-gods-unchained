export type CardCollectionDto = Readonly<{
    total: number;
    page: number;
    perPage: number;
    records: CardsDto[];
}>;

export type CardsDto= Readonly<{
    id: string,
    name: string,
    effect: string,
    god: string,
    rarity: string,
    mana: number,
    type: number,
    set: number,
    collectable: boolean,
    live: boolean,
    art_id: string,
    lib_id: string
   }>;