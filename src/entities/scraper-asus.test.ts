import AsusScraper from "./scraper-asus"

jest.setTimeout(60000)

describe("AsusScraper", () => {

  it("should be a class with constructor", () => {
    const scraper = new AsusScraper()

    expect(scraper).toBeInstanceOf(AsusScraper)
  })

  describe("getProductSpecification", () => {
    let scraper: AsusScraper
    beforeAll(async () => {
      scraper = new AsusScraper()
      await scraper.init()
    })

    afterAll(async () => {
      await scraper.close()
    })

    it("should throw for unsupported domain", async () => {
      expect(scraper.getProductSpecification('https://foo.bar/xxx')).rejects.toThrowError("Unsupported domain name.")
    })


    it("should retrieve specification from www.asus.com", async () => {
      const resp = await scraper.getProductSpecification('https://www.asus.com/ua-ua/mobile/phones/zenfone/zenfone-8-flip/techspec/')

      expect(resp).toEqual(expect.objectContaining({
        "Design": "Galactic Black\nGlacier Silver",
        "Processor": "Qualcomm® Snapdragon™ 888 5G Mobile Platform\nQualcomm® Adreno™ 660",
        "Battery": "ПОЛІМЕРНИЙ 5000 мА·год\n5000 mAh high capacity battery\nSupports Quick Charge 4.0 and PD Charging"
      }))
    })

    it("should retrieve specification from rog.asus.com", async () => {
      const resp = await scraper.getProductSpecification('https://rog.asus.com/ua-ua/phones/rog-phone-5s-pro-model/spec/')

      expect(resp).toEqual(expect.objectContaining({
        "Колір": "Phantom Black",
        "Процесор": "Qualcomm® Snapdragon® 888+ 5G Mobile Platform\nQualcomm® Adreno™ 660",
      }))
    })

    it("should retrieve specification from rog.asus.com for multy-optional", async () => {
      const resp = await scraper.getProductSpecification('https://rog.asus.com/phones/rog-phone-6d-model/spec/')

      expect(resp).toEqual(expect.objectContaining({
        "Weight and Dimension": "239g, \n173 x 77x 10.4 mm",
        "Operating System": "Android 12",
      }))
    })

  })

  describe("getModels", () => {
    let scraper: AsusScraper
    beforeAll(async () => {
      scraper = new AsusScraper()
      await scraper.init()
    })

    afterAll(async () => {
      await scraper.close()
    })

    it("should retrieve array of available models from the url", async () => {
      const resp = await scraper.getModels('https://www.asus.com/ua-ua/mobile/phones/all-series/filter?Series=ZenFone,ROG-Phone')

      expect(resp).toEqual(expect.arrayContaining([
        {
          _id: expect.any(String),
          title: "ROG Phone 5",
          manufacturer: "asus",
          url: "https://rog.asus.com/ua-ua/phones/rog-phone-5-model/spec/"
        }
      ]))
    })
  })
})
