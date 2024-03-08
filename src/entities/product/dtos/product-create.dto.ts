export interface ProductCreateDTO {
  supplierId: string;
  categoryId: string;
  name: string;
  color?: string;
  fabric?: string;
  measure?: string;
  dtEntry?: Date;
  dtDeparture?: Date;
  nrClient?: string;
  fiscalNoteEntry?: string;
  fiscalNoteDeparture?: string;
}
