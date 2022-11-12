
export const SUPPORTED_MANUFACTURES = {
  asus: "asus",
  samsung: "samsung"
}as const
export type ISupportedManufactures = typeof SUPPORTED_MANUFACTURES[keyof typeof SUPPORTED_MANUFACTURES]

export interface IModel{
  _id:string,
  title:string,
  manufacturer:ISupportedManufactures
  url:string
}

export interface IManufacture{
  _id:string,
  title:string,
  name:ISupportedManufactures,
  url:string
}
