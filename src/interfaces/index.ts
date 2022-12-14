export type IManufacture = {
  _id: string,
  title: string,
  name: ISupportedManufactures,
  url: string
}

export const SUPPORTED_MANUFACTURES = {
  asus: "asus",
  samsung: "samsung",
  huawei: "huawei"
} as const
export type ISupportedManufactures = typeof SUPPORTED_MANUFACTURES[keyof typeof SUPPORTED_MANUFACTURES]

export const MANUFACTURES: IManufacture[] = [
  {
    _id: "1",
    name: "asus",
    title: "Asus",
    url: "https://www.asus.com/ua-ua/mobile/phones/all-series/filter?Series=ZenFone,ROG-Phone"
  },
  {
    _id: "2",
    name: "samsung",
    title: "Samsung",
    url: "https://www.samsung.com/ua/smartphones/galaxy-s/"
  },
  {
    _id: "3",
    name: "huawei",
    title: "Huawei",
    url: "https://consumer.huawei.com/en/phones/"
  }
]

export type IModel = {
  _id: string,
  title: string,
  manufacturer: ISupportedManufactures
  url: string
}

export type IStorage={
  connect:()=>Promise<void>
  getManufactures:()=>Promise<IManufacture[]>
  setManufactures:(manufacturers:IManufacture[])=>Promise<void>
  getManufacture:(id:string)=>Promise<IManufacture>
  getModels:()=>Promise<IModel[]>
  setModels:(models:IModel[])=>Promise<void>
  getModel:(id:string)=>Promise<IModel>
}

export type IScraper={
  manufacturerName:ISupportedManufactures
  getProductSpecification:(url:string)=>Promise< {[key: string]: string}>
  getModels:(url:string)=>Promise<IModel[]>
}
