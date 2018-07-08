import {Minimatch} from 'minimatch'


export interface UCSConfigEntry {
  name: string
  matcher: string
  getTestDataPath: (pth: string) => string
  getTestCSSPath: (pth: string) => string
  getTestJSPath: (pth: string) => string
  renderServer: (component: any, data: any, pth: string) => string
  renderClient: (container: HTMLElement, component: any, data: any, pth: string) => string
}

export interface WebpackContext {
  (key: string): any
  keys: () => string[]
  resolve: (key: string) => string
}

export interface ComponentContentEntry {
  key: string
  data: {[key: string]: any}
  config: UCSConfigEntry
}
export type ComponentContents = {[key: string]: ComponentContentEntry}


export default class UniversalComponentConfig {
  public configs: UCSConfigEntry[]
  public contents: ComponentContents

  constructor (
    public context: WebpackContext
  ) {
    this.configs = []
    this.contents = {}
  }

  collectComponents () {
    this.configs.forEach((conf) => {
      const keys = this.context.keys()
      const mm = new Minimatch(conf.matcher)
      const matched = keys.filter((key: string) => { 
        return mm.match(key)
      })

      matched.forEach((key) => {
        const dataPath = conf.getTestDataPath(key)
        let data: any
        try {
          data = this.context(dataPath)
        } catch (e) {
          data = {default: {}}
        }

        this.contents[key] = {key, data, config: conf}
      })
    })
  }

  addComponentRunner(config: UCSConfigEntry) {
    this.configs.push(config)
  }
}
