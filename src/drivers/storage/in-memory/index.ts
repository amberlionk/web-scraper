import {IModel, IManufacture} from "../../../interfaces"

const manufactures={} as{
  [key:string]:IManufacture
}

const models={} as{
  [key:string]:IModel
}

export async function connect():Promise<void>{
}

export async function getModels():Promise<IModel[]>{
  return Object.values(models)
}

export async function setModels(modelsForSave:IModel[]):Promise<void>{
  for (const model of modelsForSave) {
    models[model._id] = model
  }
}

export async function getModel(id:string):Promise<IModel>{
  return models[id]
}


export async function getManufactures():Promise<IManufacture[]>{
  return Object.values(manufactures)
}

export async function getManufacture(id:string):Promise<IManufacture>{
  return manufactures[id]
}

export async function setManufactures(manufacturersForSave:IManufacture[]):Promise<void>{
  for (const manuf of manufacturersForSave) {
    manufactures[manuf._id] = manuf
  }
}
