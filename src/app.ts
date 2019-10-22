import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'
​
export interface MyHttpResponse {
  json: (item: any) => void
  send: (content: string) => void
}
​
export interface MyHttpRequest {}
​
class Express {
  // You HAVE TO replace any by the real signature
  [x: string]: any
​
  private server: any
  private routes: any = {}
​
  private readonly WWW_DIRECTORY = 'www'
  private readonly TEMPLATE_PAGE_DIRECTORY = 'templates'
  private readonly TEMPLATE_EXTENSION = '.html.mustache'
​
  constructor() {
    this._initialize()
  }
​
  listen(port: number, callback: () => void): void {
    this.server.listen(port, callback)
  }


  // Rendering  ​

  render(
    fileName: string,
    values: any,
    callback: (error: Error | null, html: string | null) => void
  ) {
    // set template filename
    console.log('fezfezfzefz')
    const pathName = path.join(
      process.cwd(),
      this.WWW_DIRECTORY,
      this.TEMPLATE_PAGE_DIRECTORY,
      `${fileName}${this.TEMPLATE_EXTENSION}`
    )
​
    // check if exist
    if (!fs.existsSync(pathName)) {
      callback(new Error(`404 Page ${fileName} doesn't exist`), null)
      return
    }
​
    // read data mustache
    const content = fs.readFileSync(pathName, 'utf-8')
​
    // search by regex and return new string with data
    const processContent = content.replace(
      /{{(\w+)( ?[|] ?)?(\w+)?}}/gi,
      (item: string, ...args: any[]): string => {
        // get founded mustache
        const [key, pipe, transform] = args
​
        // return new value if exist on our object
        const v = values[key]
​
        // if not founded
        if (!v) {
          return 'undefined'
        }
​
        // ...else apply transform method
        if (pipe && transform) {
          const func = this[`_${transform}`]
          if (func) {
            return func(v)
          }
        } else {
          return v
        }
      }
    )
​
    // call with new content
    callback(null, processContent)
  }

  /**
   * PRIVATE
   */
  private _initialize() {
    for (const verb of ['GET', 'POST', 'PUT', 'DELETE']) {
      this.routes[verb] = []
      // You HAVE TO replace any by the real signature
      this[verb.toLowerCase()] = (url: string, callback: any) => {
        this.routes[verb].push({ url, callback })
      }
    }
​
    this.server = http.createServer(
      (req: http.IncomingMessage, res: http.ServerResponse): void => {
        const { method, url } = req
​
        const response: MyHttpResponse = this._overrideReponse(res)
​        console.log(method);
        console.log(url);
        

        const route = this.routes[method].find((item: {url: string}) => item.url === url)
        console.log(this.routes); 
        if (!route) {
          res.statusCode = 404;
          res.end()
          return
        }
​
        route.callback(req, response)
      }
    )
  }
​
  private _overrideReponse(res: http.ServerResponse): MyHttpResponse {
    const json = (item: any): void => {
      res.write(JSON.stringify(item))
      res.end()
    }
​
    const send = (content: string): void => {
      res.write(content)
      res.end()
    }
​
    return { ...res, json, send }
  }
​
  private _upper(str: string): string {
    return str.toUpperCase()
  }
​
  private _lower(str: string): string {
    return str.toLowerCase()
  }
}
​
export default () => new Express()
