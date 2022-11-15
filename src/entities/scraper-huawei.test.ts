import HuaweiScraper from "./scraper-huawei"

jest.setTimeout(60000)

describe("AsusScraper", () => {

  it("should be a class with constructor", () => {
    const scraper = new HuaweiScraper()

    expect(scraper).toBeInstanceOf(HuaweiScraper)
  })

  describe("getProductSpecification", () => {
    let scraper: HuaweiScraper
    beforeAll(async () => {
      scraper = new HuaweiScraper()
      await scraper.init()
    })

    afterAll(async () => {
      await scraper.close()
    })


    it("should retrieve specification", async () => {
      let resp = await scraper.getProductSpecification('https://consumer.huawei.com/en/phones/mate50-pro/specs/')

      expect(resp).toEqual(expect.objectContaining({
        "Dimensions": "Height: 162.1 mm \nWidth: 75.5 mm \nDepth: 8.5 mm \nWeight:  Approx. 209 g (with battery)",
        "Operating System": "EMUI 13"
      }))
    })
  })

  describe("getModels", () => {
    let scraper: HuaweiScraper
    beforeAll(async () => {
      scraper = new HuaweiScraper()
      await scraper.init()
    })

    afterAll(async () => {
      await scraper.close()
    })

    it("should retrieve array of available models from the url", async () => {
      const resp = await scraper.getModels('https://consumer.huawei.com/en/phones/')

      expect(resp).toEqual(expect.arrayContaining([
        {
          _id: expect.any(String),
          title: "HUAWEI Mate 50 Pro",
          manufacturer: "huawei",
          url: "https://consumer.huawei.com/en/phones/mate50-pro/specs/"
        }
      ]))
    })
  })
})
