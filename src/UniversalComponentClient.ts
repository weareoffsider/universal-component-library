import UniversalComponentConfig from './UniversalComponentConfig'

export default class UniversalComponentClient {
  constructor(
    public config: UniversalComponentConfig,
  ) {
    config.collectComponents()

    document.addEventListener('DOMContentLoaded', function (event) {
      const componentView = document.querySelector(".RenderAllContainer")

      if (!componentView) { return } // on index

      const componentRenders = document.querySelectorAll(".RenderContainer")
      const componentKey = componentView.getAttribute('data-component-key')
      const componentModule = config.context(componentKey)
      const componentEntry = config.contents[componentKey]

      Array.prototype.forEach.call(componentRenders, (renderElem: HTMLElement) => {
        const dataKey = renderElem.getAttribute('data-props-key')
        const data = componentEntry.data[dataKey]

        componentEntry.config.renderClient(
          renderElem,
          componentModule,
          data,
          componentKey
        )
      })
    })
  }
}
