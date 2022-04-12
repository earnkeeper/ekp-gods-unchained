export type ProtoDto = Readonly<{
id: number,
name: string,
effect: string,
god: string,
rarity: string,
tribe: TribeDto[], 
mana: number,
attack: AttackDto[],
health: HealthDto[]
type: string,
set: string,
collectable: boolean,
live: boolean,
art_id: string,
lib_id: string,
}>;

export type TribeDto= Readonly<{
    String: string,
    Valid: false,
   }>;

export type AttackDto= Readonly<{
    Int64: number,
    Valid:  boolean,
   }>;

export type HealthDto = Readonly<{
    "Int64": 0,
    "Valid": false
   }>;