import {getScraperForManufacturer} from "../entities/scraper-factory"
import {IModel} from "./../interfaces"


type Storage={
  getModels:()=>Promise<IModel[]>
  getModel:(id:string)=>Promise<IModel>
}

export async function getModels(storage:Storage): Promise<IModel[]> {
return storage.getModels()
}


type ProductSpecification = {
  [key: string]: string
}
export async function getModelSpec(storage:Storage, modelID: string): Promise<ProductSpecification> {
  const model = await storage.getModel(modelID)
  if(!model) throw new Error(`Model with ID ${modelID} not found`)

  const scraper = await getScraperForManufacturer(model.manufacturer)
  const productSpec: ProductSpecification = await scraper.getProductSpecification(model.url)

  return productSpec
}
