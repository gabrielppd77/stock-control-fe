import { StatusProductEnum } from "@entities/enums/status-product.enum";

export interface ProductPresenter {
  id: string;
  supplierId: string;
  categoryId: string;
  name: string;
  supplierName: string;
  categoryName: string;
  color?: string;
  fabric?: string;
  measure?: string;
  dtEntry?: Date;
  dtDeparture?: Date;
  nrClient?: string;
  fiscalNoteEntry?: string;
  fiscalNoteDeparture?: string;
  status: StatusProductEnum;
  statusName: string;
}
