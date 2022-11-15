import { IModel, SUPPORTED_MANUFACTURES, IScraper } from "../interfaces"
import Scraper from "./scraper"
import { v4 as uuidv4 } from 'uuid';

interface ProductSpecification {
  [key: string]: string
}

export default class HuaweiScraper extends Scraper implements IScraper {
  readonly manufacturerName = SUPPORTED_MANUFACTURES.huawei

  async getProductSpecification(url: string): Promise<ProductSpecification> {
    const page = await this.browser.newPage();
    await page.goto(url)

    const spec = await page.waitForSelector("ul.large-accordion__list")
    if (!spec) throw new Error("Spec not found on page")

    const productSpec: ProductSpecification = {}
    const specRows = await spec.$$("li")
    for (const row of specRows) {
      let popName = await row.$eval("span.large-accordion-title", el => el.innerHTML)

      let propValues: string[] = []
      let propValueHandlers = await row.$$("div.large-accordion-columns div.multi-watchGt-item:first-child div.multi-watchGt-list")
      if(propValueHandlers.length>0){
        for (const propRow of propValueHandlers) {
          let title
          if ((await propRow.$("div.multi-watchGt-subtitle")) !== null) {
            title = await propRow.$eval("div.multi-watchGt-subtitle", el => el.innerHTML)
          }
          let value = await propRow.$eval("div.multi-watchGt-text", el => el.innerHTML)
          propValues.push(title ? `${title}: ${value}` : value)
        }
      }else{
        propValueHandlers = await row.$$("div.large-accordion-columns .large-accordion__inner")
        for (const propRow of propValueHandlers) {
          let title
          if ((await propRow.$("div.large-accordion-subtitle")) !== null) {
            title = await propRow.$eval("div.large-accordion-subtitle", el => el.innerHTML)
          }
          let value = await propRow.$eval("p", el => el.innerHTML)
          propValues.push(title ? `${title}: ${value}` : value)
        }
      }

      let propValue = propValues.join("\n")

      if (popName != null && propValue != null) {
        popName = this.innerHTMLToText(popName)
        propValue = this.innerHTMLToText(propValue)

        productSpec[popName] = propValue
      }
    }

    return productSpec
  }

  async getModels(url: string): Promise<IModel[]> {
    const page = await this.browser.newPage();
    await page.goto(url)

    const modelsListDiv = await page.waitForSelector("div.series-banner-item")
    if (!modelsListDiv) throw new Error("modelsListDiv not found on page")
    const modelsHandleList = await modelsListDiv.$$("div.series-item-card")
    const models: IModel[] = []
    for (const modelDiv of modelsHandleList) {
      let title = this.innerHTMLToText(await modelDiv.$eval("a.btn--series-topdp", el => el.innerHTML))
      let url = await modelDiv.$eval("a.btn--series-topdp", el => el.getAttribute("href")) || ""
      url = `https://consumer.huawei.com${url}specs/`

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
