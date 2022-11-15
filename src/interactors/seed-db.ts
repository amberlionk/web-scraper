import {IStorage,MANUFACTURES} from "../interfaces"
import {scrapeModelsList} from "./../interactors/model"

type Storage= Pick<IStorage,"getManufactures"|"setManufactures"|"getModels"|"setModels"|"getModel">

export async function seedDB(storage:Storage):Promise<void>{
  let manufacturers = await storage.getManufactures()
  if(!manufacturers.length){
    console.log("Seeding manufactures....")
    await storage.setManufactures(MANUFACTURES)
    console.log("Seeding manufactures complete.")
    manufacturers = await storage.getManufactures()
  }

  if(!(await storage.getModels()).length){
    console.log("Seeding models....");
    for (const manuf of manufacturers) {
      const models = await scrapeModelsList(storage,manuf)

      await storage.setModels(models)
      console.log(`Seeding ${manuf.name} done.`);
    }
    console.log("Seeding models complete.")
  }
}
