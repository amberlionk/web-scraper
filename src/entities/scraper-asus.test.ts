import AsusScraper from "./scraper-asus"

jest.setTimeout(30000)

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
        "Design":"Galactic Black\nGlacier Silver",
        "Processor":"Qualcomm® Snapdragon™ 888 5G Mobile Platform\nQualcomm® Adreno™ 660",
        "Battery":"ПОЛІМЕРНИЙ 5000 мА·год\n5000 mAh high capacity battery\nSupports Quick Charge 4.0 and PD Charging"
      }))
    })

    it("should retrieve specification from rog.asus.com", async () => {
      const resp = await scraper.getProductSpecification('https://rog.asus.com/ua-ua/phones/rog-phone-5s-pro-model/spec/')

      expect(resp).toEqual(expect.objectContaining({
        "Колір":"Phantom Black",
        "Процесор":"Qualcomm® Snapdragon® 888+ 5G Mobile Platform\nQualcomm® Adreno™ 660",
      }))
    })

  })
})
