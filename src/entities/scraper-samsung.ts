import { IModel, SUPPORTED_MANUFACTURES, IScraper } from "../interfaces"
import Scraper from "./scraper"
import { v4 as uuidv4 } from 'uuid';

interface ProductSpecification {
  [key: string]: string
}

export default class SamsungScraper extends Scraper implements IScraper {
  readonly manufacturerName = SUPPORTED_MANUFACTURES.samsung

  async getProductSpecification(url: string): Promise<ProductSpecification> {
    const page = await this.browser.newPage();
    await page.goto(url)

    const spec = await page.waitForSelector(".specification__table")
    if (!spec) throw new Error("Spec not found on page")

    const productSpec: ProductSpecification = {}
    const specRows = await spec.$$(".specification__row")
    for (const row of specRows) {
      let popName = await row.$eval("h3", el => el.innerHTML)

      let propValues: string[] = []
      let propValueHandlers = await row.$$("li")
      for (const li of propValueHandlers) {
        let title
        if ((await li.$("div.name")) !== null) {
          title = await li.$eval("div.name", el => el.innerHTML)
        }
        let value = await li.$eval("div.detail", el => el.innerHTML)
        propValues.push(title ? `${title}: ${value}` : value)
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

    const modelsListDiv = await page.waitForSelector("div.pd03-product-finder__content-wrap")
    if (!modelsListDiv) throw new Error("modelsListDiv not found on page")
    const modelsHandleList = await modelsListDiv.$$("div.pd03-product-finder__content-item")
    const models: IModel[] = []
    for (const modelDiv of modelsHandleList) {
      let title = this.innerHTMLToText(await modelDiv.$eval("p.pd03-product-card__product-name-text", el => el.innerHTML))
      let url = await modelDiv.$eval("a.pd03-product-card__product-name-link", el => el.getAttribute("href")) || ""
      url = `https://www.samsung.com${url}specs/`

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
