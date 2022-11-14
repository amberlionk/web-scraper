import {IManufacture, IStorage} from "../interfaces"

type Storage= Pick<IStorage,"getManufactures">

export async function getManufactures(storage:Storage): Promise<IManufacture[]>{

  return storage.getManufactures()
}
