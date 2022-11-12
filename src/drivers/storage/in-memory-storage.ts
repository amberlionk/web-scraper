import {IModel} from "./../../interfaces"

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
}

export async function getModel(id:string):Promise<IModel>{
  return models[id]
}
