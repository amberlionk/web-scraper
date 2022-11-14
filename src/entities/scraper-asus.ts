import {IModel} from "./../interfaces"
import Scraper from "./scraper"

interface ProductSpecification{
  [key:string]:string
}

export default class AsusScraper extends Scraper {

  async getProductSpecification(url: string):Promise<ProductSpecification> {
    switch (true) {
      case url.includes("//www.asus.com/"):

        return this.getProductSpecificationAsusBrand(url)
      
      case url.includes("//rog.asus.com/"):

        return this.getProductSpecificationRogBrand(url)

      default:
        throw new Error("Unsupported domain name.")
    }
  }

  private async getProductSpecificationAsusBrand(url: string):Promise<ProductSpecification> {
    const page = await this.browser.newPage();
    await page.goto(url)
  
    const spec = await page.waitForSelector(".TechSpec__section__9V8DZ")
    if(!spec) throw new Error("Spec not found on page")

    const productSpec:ProductSpecification ={}
    const specRows = await spec.$$(".TechSpec__techSpecContainer__GSlpY > div")
    for (const row of specRows) {
      let popName = await row.$eval("h2.TechSpec__title__2PR1t", el => el.innerHTML)
      let propValue = await row.$eval("div.TechSpec__content__2E2e_", el => el.innerHTML)
  
      if(popName!=null && propValue!=null){
        popName=this.innerHTMLToText(popName)
        propValue=this.innerHTMLToText(propValue)

        productSpec[popName]=propValue
      }
    }

    return productSpec
  }

  private async getProductSpecificationRogBrand(url: string):Promise<ProductSpecification> {
    const page = await this.browser.newPage();
    await page.goto(url)
  
    const spec = await page.waitForSelector(".ProductSpecSingle__single__3YObU")
    if(!spec) throw new Error("Spec not found on page")

    const productSpec:ProductSpecification ={}
    const specRows = await spec.$$("div.ProductSpecSingle__productSpecItemRow__3sjMJ")
    for (const row of specRows) {
      let popName = await row.$eval("h2.ProductSpecSingle__productSpecItemTitle__8gSrN", el => el.innerHTML)
      let propValueRows = await row.$$eval("span.ProductSpecSingle__descriptionItemValue__lVa0O", elArray => elArray.map(el => el.innerHTML))
      let propValue = propValueRows.join("\n")
  
      if(popName!=null && propValue!=null){
        popName=this.innerHTMLToText(popName)
        propValue=this.innerHTMLToText(propValue)

        productSpec[popName]=propValue
      }
    }

    return productSpec
  }

  async getModels(url: string):Promise<IModel[]> {

    return []
  }
}
