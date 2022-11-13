import puppeteer, {Browser} from 'puppeteer'

export default class Scraper {
  protected browser!:Browser 

  async init(): Promise<void>{
    this.browser = await puppeteer.launch();
  }

  async close(): Promise<void>{
    await this.browser.close()
  }

  innerHTMLToText(html:string): string{
    return html
    .replace(/<br>/g,"\n")
    .replace(/&nbsp;/g," ")
    .replace(/<sup>/g,"")
    .replace(/<\/sup>/g,"")
    .trim()
  }
}
