
export const SUPPORTED_MANUFACTURES = {
  asus: "asus",
  samsung: "samsung"
}as const
export type ISupportedManufactures = typeof SUPPORTED_MANUFACTURES[keyof typeof SUPPORTED_MANUFACTURES]

export type IModel = {
  _id:string,
  title:string,
  manufacturer:ISupportedManufactures
  url:string
}

export type IManufacture = {
  _id:string,
  title:string,
  name:ISupportedManufactures,
  url:string
}
