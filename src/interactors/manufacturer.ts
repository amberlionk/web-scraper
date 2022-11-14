import {IManufacture} from "../interfaces"

type Storage={
  getManufactures:()=>Promise<IManufacture[]>
}

export async function getManufactures(storage:Storage): Promise<IManufacture[]>{

  return storage.getManufactures()
}
