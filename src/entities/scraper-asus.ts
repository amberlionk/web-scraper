import Scraper from "./scraper"

interface ProductSpecification{
  [key:string]:string
}

export default class AsusScraper extends Scraper {

  async getProductSpecification(url: string):Promise<ProductSpecification> {
    const productSpec:ProductSpecification ={}

    const page = await this.browser.newPage();
  
    await page.goto(url)
  
    const spec = await page.waitForSelector(".TechSpec__section__9V8DZ")
    if(!spec) throw new Error("Spec not found on page")


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
}
