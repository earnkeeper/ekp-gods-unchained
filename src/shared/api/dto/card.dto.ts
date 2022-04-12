export type CardDto = Readonly<{
    total: number;
    page: number;
    perPage: number;
    records: RecordsDto[];
   }>;
export type RecordsDto= Readonly<{
     id: IdDto[];
     user: string;
     proto: number;
     purity: number;
   }>;

export type IdDto= Readonly<{
    Int64: number;
    Valid: boolean;
  }>;

