import AsusScraper from "./scraper-asus"

jest.setTimeout(30000)

describe("Scraper", () => {

  it("should be a class with constructor", () => {
    const scraper = new AsusScraper()

    expect(scraper).toBeInstanceOf(AsusScraper)
  })

  describe("scrape", () => {
    let scraper: AsusScraper
    beforeAll(async () => {
      scraper = new AsusScraper()
      await scraper.init()
    })

    afterAll(async () => {
      await scraper.close()
    })


    it("should retrieve specification", async () => {
      const resp = await scraper.getProductSpecification('https://www.asus.com/ua-ua/mobile/phones/zenfone/zenfone-8-flip/techspec/')

      expect(resp).toEqual(expect.objectContaining({
        "Design":"Galactic Black\nGlacier Silver",
        "Processor":"Qualcomm® Snapdragon™ 888 5G Mobile Platform\nQualcomm® Adreno™ 660",
        "Battery":"ПОЛІМЕРНИЙ 5000 мА·год\n5000 mAh high capacity battery\nSupports Quick Charge 4.0 and PD Charging"
      }))
    })

  })
})
