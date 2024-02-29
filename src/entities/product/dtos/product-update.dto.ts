import { StatusProductEnum } from "@entities/enums/status-product.enum";

export interface ProductUpdateDTO {
  name: string;
  color?: string;
  fabric?: string;
  measure?: string;
  dtEntry?: string;
  dtDeparture?: string;
  nrClient?: string;
  fiscalNoteEntry?: string;
  fiscalNoteDeparture?: string;
  status: StatusProductEnum;
}
