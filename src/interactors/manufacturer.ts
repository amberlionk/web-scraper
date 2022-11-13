import Storage from "../drivers/storage"
import {IManufacture} from "../interfaces"

export async function getManufactures(): Promise<IManufacture[]>{
  return Storage.getManufactures()
}
