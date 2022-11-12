import {SUPPORTED_MANUFACTURES, ISupportedManufactures} from "./../interfaces"
import AsusScraper from "./scraper-asus"

type SupportedScrapers = AsusScraper
const supportedScrapersInstances ={} as {
  [SUPPORTED_MANUFACTURES.asus]:AsusScraper,
  [SUPPORTED_MANUFACTURES.samsung]:AsusScraper
}

export async function initScrapers(): Promise<void>{
  let scraper

  scraper = new AsusScraper()
  await scraper.init()
  supportedScrapersInstances[SUPPORTED_MANUFACTURES.asus]=scraper
  
  scraper = new AsusScraper()
  await scraper.init()
  supportedScrapersInstances[SUPPORTED_MANUFACTURES.samsung]=scraper

}

export async function getScraperForManufacturer(manufacture:ISupportedManufactures): Promise<SupportedScrapers>{
  switch (manufacture) {
    case SUPPORTED_MANUFACTURES.asus:
      if(!supportedScrapersInstances[manufacture]) {      
        const scraper = new AsusScraper()
        await scraper.init()
        supportedScrapersInstances[manufacture]=scraper
      }

      return supportedScrapersInstances[manufacture]

    case SUPPORTED_MANUFACTURES.samsung:
      if(!supportedScrapersInstances[manufacture]) {
        const scraper = new AsusScraper()
        await scraper.init()
        supportedScrapersInstances[manufacture]=scraper
      }
      
      return supportedScrapersInstances[manufacture]

    default:
      throw new Error("Unsupported manufacturer for scraping.")
  }

}
