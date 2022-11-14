import {getScraperForManufacturer} from "../entities/scraper-factory"
import {IModel,IStorage, IManufacture} from "./../interfaces"


type Storage= Pick<IStorage,"getModels"|"getModel">

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
  const productSpec = await scraper.getProductSpecification(model.url)

  return productSpec
}


export async function scrapeModelsList(storage:Storage, manuf:IManufacture): Promise<IModel[]> {
    const scraper = await getScraperForManufacturer(manuf.name)

  return scraper.getModels(manuf.url)
}
