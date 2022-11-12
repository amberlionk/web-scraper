import Storage from "./../drivers/storage"
import {getScraperForManufacturer} from "./../entities/scraper-factory"

interface ProductSpecification {
  [key: string]: string
}
export async function retrieveSpec(modelID: string): Promise<ProductSpecification> {
  const model = await Storage.getModel(modelID)
  if(!model) throw new Error(`Model with ID ${modelID} not found`)

  const scraper = await getScraperForManufacturer(model.manufacturer)
  const productSpec: ProductSpecification = await scraper.getProductSpecification(model.url)

  return productSpec
}
