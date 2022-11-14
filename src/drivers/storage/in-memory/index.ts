import {IModel, IManufacture} from "../../../interfaces"

const manufactures={} as{
  [key:string]:IManufacture
}

const models={} as{
  [key:string]:IModel
}

export async function connect():Promise<void>{
  models["1"]={
    _id:"1",
    manufacturer:"asus",
    title:"Zenfone 8 Flip",
    url:"https://www.asus.com/ua-ua/mobile/phones/zenfone/zenfone-8-flip/techspec/"
  }

  models["2"]={
    _id:"2",
    manufacturer:"asus",
    title:"ROG Phone 5s Pro",
    url:"https://rog.asus.com/ua-ua/phones/rog-phone-5s-pro-model/spec/"
  }

  manufactures["1"] = {
    _id:"1",
    name:"asus",
    title:"Asus",
    url:"https://www.asus.com/mobile/phones/all-series/filter?Series=ZenFone,ROG-Phone"
  }
  
  manufactures["2"] = {
    _id:"2",
    name:"samsung",
    title:"Samsung",
    url:"https://"
  }
}

export async function getModels():Promise<IModel[]>{
  return Object.values(models)
}

export async function getModel(id:string):Promise<IModel>{
  return models[id]
}


export async function getManufactures():Promise<IManufacture[]>{
  return Object.values(manufactures)
}
