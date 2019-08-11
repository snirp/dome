const TXT = 'TXT'

export default function createElement(type, config, ...args) {
  const props = Object.assign({}, config)
  const rawChildren = args.length > 0 ? [].concat(...args) : []
  props.children = rawChildren
    .filter(c => c != null && c !== false)
    .map(c => typeof c == 'string' || c instanceof String 
      ? createElement(TXT, { nodeValue: c })
      : c
    )
  return { type, props }
}