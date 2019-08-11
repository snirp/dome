let rootInstance = null

export function render(element, container) {
  const prevInstance = rootInstance
  const nextInstance = reconcile(container, prevInstance, element)
  rootInstance = nextInstance
}

function reconcile(parentDom, instance, element) {
  if (instance == null) {
    // Create instance
    const newInstance = instantiate(element)
    parentDom.appendChild(newInstance.dom)
    return newInstance
  } else if (element == null) {
    // Remove instance
    parentDom.removeChild(instance.dom)
    return null
  } else if (instance.element.type !== element.type) {
    // Replace instance
    const newInstance = instantiate(element)
    parentDom.replaceChild(newInstance.dom, instance.dom)
    return newInstance
  } else if (typeof element.type === "string") {
    // Update dom instance
    updateDomProperties(instance.dom, instance.element.props, element.props)
    instance.childInstances = reconcileChildren(instance, element)
    instance.element = element
    return instance
  } else {
    //Update component instance
    instance.publicInstance.props = element.props
    const childElement = instance.publicInstance.render()
    const oldChildInstance = instance.childInstance
    const childInstance = reconcile(parentDom, oldChildInstance, childElement)
    instance.dom = childInstance.dom
    instance.childInstance = childInstance
    instance.element = element
    return instance
  }
}

function reconcileChildren(instance, element) {
  const dom = instance.dom
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];
  const newChildInstances = []
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const newChildInstance = reconcile(dom, childInstances[i], nextChildElements[i]);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(instance => instance != null);
}

function instantiate(element) {
  const { type, props } = element
  const isDomElement = typeof type === "string"

  if (isDomElement) {
    // Instantiate DOM element
    const dom = type === 'TXT'
      ? document.createTextNode('')
      : document.createElement(type)

    updateDomProperties(dom, [], props);

    const childElements = props.children || []
    const childInstances = childElements.map(instantiate)
    childInstances.forEach(childInstance => dom.appendChild(childInstance.dom))

    return {dom, element, childInstances}
  } else {
    // Instantiate component element
    const instance = {}
    const publicInstance = createPublicInstance(element, instance)
    const childElement = publicInstance.render()
    const childInstance = instantiate(childElement)
    const dom = childInstance.dom

    Object.assign(instance, { dom, element, childInstance, publicInstance })
    return instance
  }
}

function createPublicInstance(element, internalInstance) {
  const { type, props } = element
  const publicInstance = new type(props)
  publicInstance.__internalInstance = internalInstance
  return publicInstance
}

export function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom, internalInstance, element);
}

function updateDomProperties(dom, prevProps, nextProps) {
  const getEventType = eventName => eventName.substring(2).toLowerCase()
  const isEvent = name => name.startsWith("on")
  const isAttribute = name => !isEvent(name) && name != "children"

  // Remove attributes
  Object.keys(prevProps).filter(isAttribute).forEach(name => {
    dom[name] = null
  })

  // Set attributes
  Object.keys(nextProps).filter(isAttribute).forEach(name => {
    dom[name] = nextProps[name]
  })

  // Remove event listeners
  Object.keys(prevProps).filter(isEvent).forEach(name => {
    dom.removeEventListener(getEventType(name), prevProps[name])
  })

  // Add event listeners
  Object.keys(nextProps).filter(isEvent).forEach(name => {
    dom.addEventListener(getEventType(name), nextProps[name])
  })
}