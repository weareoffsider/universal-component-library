import {Minimatch} from 'minimatch'
import {basename, dirname, sep} from 'path'
import {uniq} from 'lodash'

export interface UCSConfigEntry {
  name: string
  matcher: string
  getTestDataPath: (pth: string) => string
  getTestCSSPath: (pth: string) => string
  getTestJSPath: (pth: string) => string
  renderServer: (component: any, data: any, pth?: string) => string
  renderClient: (container: HTMLElement, component: any, data: any, pth?: string) => string
}

export interface WebpackContext {
  (key: string): any
  keys: () => string[]
  resolve: (key: string) => string
}

export interface ComponentContentEntry {
  key: string
  commonRoot: string
  name: string
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
    let allKeys: string[] = []
    const keys = this.context.keys()
    this.configs.forEach((conf) => {
      const mm = new Minimatch(conf.matcher)
      const matched = keys.filter((key: string) => { 
        return mm.match(key)
      })
      allKeys = allKeys.concat(matched)
    })

    this.configs.forEach((conf) => {
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

        const pathComponents = uniq(dirname(key).split(sep))
        let foundCommonRoot = false
        console.log(pathComponents)

        while (!foundCommonRoot && pathComponents.length > 0) {
          const matchKey = pathComponents.join(sep)
          foundCommonRoot = allKeys.some((testKey) => {
            return (
              testKey.indexOf(matchKey) == 0 &&
              testKey !== key
            )
          })
          if (!foundCommonRoot) {
            pathComponents.pop()
          }
        }

        this.contents[key] = {
          key, data, config: conf,
          commonRoot: pathComponents.join(sep),
          name: basename(key),
        }
      })
    })

    console.log(this.contents)
  }

  addComponentRunner(config: UCSConfigEntry) {
    this.configs.push(config)
  }
}
