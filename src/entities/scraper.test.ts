import Scraper from "./scraper"

describe("Scraper", () => {

  it("should be a class with constructor", () => {
    const scraper = new Scraper()

    expect(scraper).toBeInstanceOf(Scraper)
  })
})
