import { IModel, SUPPORTED_MANUFACTURES, IScraper } from "./../interfaces"
import Scraper from "./scraper"
import { v4 as uuidv4 } from 'uuid';

interface ProductSpecification {
  [key: string]: string
}

export default class AsusScraper extends Scraper implements IScraper {
  readonly manufacturerName = SUPPORTED_MANUFACTURES.asus

  async getProductSpecification(url: string): Promise<ProductSpecification> {
    switch (true) {
      case url.includes("//www.asus.com/"):

        return this.getProductSpecificationAsusBrand(url)

      case url.includes("//rog.asus.com/"):

        return this.getProductSpecificationRogBrand(url)

      default:
        throw new Error("Unsupported domain name.")
    }
  }

  private async getProductSpecificationAsusBrand(url: string): Promise<ProductSpecification> {
    const page = await this.browser.newPage();
    await page.goto(url)

    const spec = await page.waitForSelector(".TechSpec__section__9V8DZ")
    if (!spec) throw new Error("Spec not found on page")

    const productSpec: ProductSpecification = {}
    const specRows = await spec.$$(".TechSpec__techSpecContainer__GSlpY > div")
    for (const row of specRows) {
      let popName = await row.$eval("h2.TechSpec__title__2PR1t", el => el.innerHTML)
      let propValue = await row.$eval("div.TechSpec__content__2E2e_", el => el.innerHTML)

      if (popName != null && propValue != null) {
        popName = this.innerHTMLToText(popName)
        propValue = this.innerHTMLToText(propValue)

        productSpec[popName] = propValue
      }
    }

    return productSpec
  }

  private async getProductSpecificationRogBrand(url: string): Promise<ProductSpecification> {
    const page = await this.browser.newPage();
    await page.goto(url)

    const spec = await Promise.race([
      page.waitForSelector(".ProductSpec__productSpecItems__1nOlu"),
      page.waitForSelector(".ProductSpecSingle__single__3YObU")
    ])
    if (!spec) throw new Error("Spec not found on page")

    let specRows = await spec.$$("div.ProductSpecSingle__productSpecItemRow__3sjMJ")
    if(specRows.length){
      const productSpec: ProductSpecification = {}
      for (const row of specRows) {
        let popName = await row.$eval("h2.ProductSpecSingle__productSpecItemTitle__8gSrN", el => el.innerHTML)
        let propValueRows = await row.$$eval("span.ProductSpecSingle__descriptionItemValue__lVa0O", elArray => elArray.map(el => el.innerHTML))
        let propValue = propValueRows.join("\n")
  
        if (popName != null && propValue != null) {
          popName = this.innerHTMLToText(popName)
          propValue = this.innerHTMLToText(propValue)
  
          productSpec[popName] = propValue
        }
      }
  
      return productSpec
    }

    specRows = await spec.$$("div.ProductSpec__spec__3A93d")
    if(specRows.length){
      const productSpec: ProductSpecification = {}
      for (const row of specRows) {
        let popName = await row.$eval("h2.ProductSpec__productSpecItemTitle__3kxCc", el => el.innerHTML)
        let propValueRows = await row.$$eval("div.ProductSpec__rowItem__1BOFK:first-child span", elArray => elArray.map(el => el.innerHTML))
        let propValue = propValueRows.join("\n")
  
        if (popName != null && propValue != null) {
          popName = this.innerHTMLToText(popName)
          propValue = this.innerHTMLToText(propValue)
  
          productSpec[popName] = propValue
        }
      }
  
      return productSpec
    }

    throw new Error("Spec is not found")    
  }

  async getModels(url: string): Promise<IModel[]> {
    const page = await this.browser.newPage();
    await page.goto(url)

    const modelsListDiv = await page.waitForSelector("div.LevelThreeFilterPage__productListTemplate__Qnsre")
    if (!modelsListDiv) throw new Error("modelsListDiv not found on page")
    const modelsHandleList = await modelsListDiv.$$("div.product_list")
    const models: IModel[] = []
    for (const modelDiv of modelsHandleList) {
      let title = this.innerHTMLToText(await modelDiv.$eval("h2", el => el.innerHTML))
      let url = await modelDiv.$eval("a.ProductCardNormalStore__button__2oYEB", el => el.getAttribute("href")) || ""
      if(url.includes("//rog.asus.com/")){
        url+="spec/"
      }else{
        url+="techspec/"
      }

      models.push({
        _id: uuidv4(),
        manufacturer: this.manufacturerName,
        title,
        url
      })
    }

    return models
  }
}
