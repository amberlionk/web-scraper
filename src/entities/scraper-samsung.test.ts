import SamsungScraper from "./scraper-samsung"

jest.setTimeout(60000)

describe("AsusScraper", () => {

  it("should be a class with constructor", () => {
    const scraper = new SamsungScraper()

    expect(scraper).toBeInstanceOf(SamsungScraper)
  })

  describe("getProductSpecification", () => {
    let scraper: SamsungScraper
    beforeAll(async () => {
      scraper = new SamsungScraper()
      await scraper.init()
    })

    afterAll(async () => {
      await scraper.close()
    })


    it("should retrieve specification", async () => {
      let resp = await scraper.getProductSpecification('https://www.samsung.com/ua/smartphones/galaxy-s22/specs/')

      expect(resp).toEqual(expect.objectContaining({
        "Процесор": "Тактова частота процесора: 2.8 ГГц, 2.5 ГГц, 1.8 ГГц\nТип процесора: 8-ядерний",
        "Операційна система": "Android"
      }))

      resp = await scraper.getProductSpecification('https://www.samsung.com/ua/smartphones/galaxy-s22-ultra/specs/')

      expect(resp).toEqual(expect.objectContaining({
        "Процесор": "Тактова частота процесора: 2.8 ГГц, 2.5 ГГц, 1.8 ГГц\nТип процесора: 8-ядерний",
        "Операційна система": "Android"
      }))
    })
  })

  describe("getModels", () => {
    let scraper: SamsungScraper
    beforeAll(async () => {
      scraper = new SamsungScraper()
      await scraper.init()
    })

    afterAll(async () => {
      await scraper.close()
    })

    it("should retrieve array of available models from the url", async () => {
      const resp = await scraper.getModels('https://www.samsung.com/ua/smartphones/galaxy-s/')

      expect(resp).toEqual(expect.arrayContaining([
        {
          _id: expect.any(String),
          title: "Galaxy S22",
          manufacturer: "samsung",
          url: "https://www.samsung.com/ua/smartphones/galaxy-s22/specs/"
        }
      ]))
    })
  })
})
