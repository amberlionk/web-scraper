import {IStorage,MANUFACTURES} from "../interfaces"
import {scrapeModelsList} from "./../interactors/model"

export async function seedDB(storage:IStorage):Promise<void>{
  const manufacturers = await storage.getManufactures()
  if(!manufacturers.length){
    await storage.setManufactures(MANUFACTURES)
  }

  if(!(await storage.getModels()).length){
    for (const manuf of manufacturers) {
      const models = await scrapeModelsList(storage,manuf)

      await storage.setModels(models)
    }
  }
}
