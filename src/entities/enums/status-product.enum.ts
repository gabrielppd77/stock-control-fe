export enum StatusProductEnum {
  AVAILABLE,
  SEPARATION,
  PREPARING,
  SENT,
}

export const StatusProductLabels: EnumLabels = {
  [StatusProductEnum.AVAILABLE]: "Disponível",
  [StatusProductEnum.SEPARATION]: "Separação",
  [StatusProductEnum.PREPARING]: "Preparando",
  [StatusProductEnum.SENT]: "Enviado",
};

export const StatusProductOptions = Object.keys(StatusProductEnum)
  .filter(
    (key) =>
      !isNaN(Number(StatusProductEnum[key as keyof typeof StatusProductEnum])),
  )
  .map((key) => ({
    value: StatusProductEnum[key as keyof typeof StatusProductEnum],
    label:
      StatusProductLabels[
        StatusProductEnum[key as keyof typeof StatusProductEnum]
      ],
  }));
