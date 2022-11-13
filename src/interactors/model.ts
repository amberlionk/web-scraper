import Storage from "../drivers/storage"
import {getScraperForManufacturer} from "../entities/scraper-factory"
import {IModel} from "./../interfaces"


export async function getModels(): Promise<IModel[]> {
return Storage.getModels()
}


type ProductSpecification = {
  [key: string]: string
}
export async function getModelSpec(modelID: string): Promise<ProductSpecification> {
  const model = await Storage.getModel(modelID)
  if(!model) throw new Error(`Model with ID ${modelID} not found`)

  const scraper = await getScraperForManufacturer(model.manufacturer)
  const productSpec: ProductSpecification = await scraper.getProductSpecification(model.url)

  return productSpec
}
