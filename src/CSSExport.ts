export default `@font-face {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  src: local('Karla'), local('Karla-Regular'), url(https://fonts.gstatic.com/s/karla/v6/qkBbXvYC6trAT7RVLtk.ttf) format('truetype');
}
html,
body {
  margin: 0;
  padding: 0;
}
.ComponentServerNav {
  font-family: Karla, sans-serif;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.15;
  letter-spacing: normal;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 239px;
  z-index: 8000000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #131313;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}
.ComponentServerNav__header {
  height: 100px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 30px 10px;
  text-align: center;
}
.ComponentServerNav__headerIcon {
  display: inline-block;
}
.ComponentServerNav__headerTitle {
  display: block;
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 10px 0;
}
.ComponentServerNav__testModeLink {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 2px;
  text-decoration: none;
  padding: 10px;
}
.ComponentServerNav__testModeLink path {
  fill: #fff;
}
.ComponentServerNav__testModeLink:hover path {
  fill: #7ED321;
}
.ComponentServerNav__bd {
  overflow: auto;
  height: calc(100vh - 100px);
  padding-bottom: 50vh;
}
.ComponentServerNav__sectionHeader {
  cursor: pointer;
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 14px 15px;
  position: relative;
}
.ComponentServerNav__sectionIcon {
  display: inline-block;
  margin-right: 10px;
}
.ComponentServerNav__sectionIcon path {
  fill: currentColor;
}
.ComponentServerNav__sectionLinks {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 15px;
}
.ComponentServerNav__sectionLink {
  color: inherit;
  text-decoration: none;
  display: block;
  padding: 6px 15px;
}
.ComponentServerNav__sectionLinkPages {
  list-style: square outside;
  padding-left: 2.5rem;
}
.ComponentServerNav__pageLink {
  text-decoration: none;
  line-height: 1.5em;
  color: inherit;
}
.ComponentServerNav__section.is-active .ComponentServerNav__sectionLinks {
  display: block;
}
.ComponentServerRenderPane {
  margin-left: 240px;
}
.ComponentServerRenderPane__title {
  font-family: Karla, sans-serif;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.15;
  letter-spacing: normal;
  font-size: 16px;
  margin: 0;
  padding: 16px 15px 15px 15px;
}
.RenderComponent {
  border-top: 1px solid #eee;
}
.RenderComponent__header {
  font-family: Karla, sans-serif;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.15;
  letter-spacing: normal;
  color: inherit;
  font-size: 16px;
  margin: 0;
  padding: 40px 15px 15px 15px;
  border-bottom: 1px solid #eee;
}
.RenderComponent__wrapper {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.RenderComponent__jsonWrapper {
  padding-right: 30px;
  background-color: #FcFcFc;
  border-top: 1px solid #eee;
}
.RenderComponent__json {
  background-color: #F9F9F9;
  border-right: 1px solid #eee;
  font-family: Inconsolata, monospace;
  letter-spacing: 0.05em;
  color: #999;
  margin: 0;
  padding: 15px;
  font-size: 11px;
  line-height: 1.5;
  overflow: auto;
  max-height: 320px;
}
.RenderComponent__json-value {
  color: #00B9FD;
}
.RenderComponent__json-key {
  color: #666;
}
.RenderComponent__json-string {
  color: #f8625f;
}
.ComponentServer__RemoveTestMode {
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0.37);
  padding: 8px 3px;
  border-radius: 0 3px 3px 0;
  top: 4px;
  left: 0;
  z-index: 99999;
  color: #fff;
}
.ComponentServer__RemoveTestModeIcon {
  display: block;
}
.ComponentServer__RemoveTestModeIcon path {
  fill: currentColor;
}
.ComponentServer__RemoveTestModeLabel {
  position: absolute;
  top: 4px;
  left: 35px;
  color: #fff;
  background: #000;
  border-radius: 3px;
  white-space: nowrap;
  font-size: 11px;
  padding: 3px 5px;
  display: none;
}
.ComponentServer__RemoveTestMode:hover .ComponentServer__RemoveTestModeLabel {
  display: block;
}
`;