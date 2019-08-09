function render(element, parent){
  const isText = typeof element === 'string' || element instanceof String
  const dom = isText ? document.createTextNode(element) : document.createElement(element.type)

  if (!isText){
    for (const [key, value] of Object.entries(element.props)) {
      if (key==='children') {
        value.forEach(el => render(el, dom))
      } else if (key.startsWith("on")) {
        dom.addEventListener(key.substring(2).toLowerCase(), value)
      } else {
        dom[key] = value
      }
    }
  }

  parent.appendChild(dom)
}

