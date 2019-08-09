const parent = document.getElementById('root')

const element = {
  type: 'div',
  props: {
    id: 'container',
    children: [
      { type: 'input', props: { value: 'foo', type: 'text' } },
      { type: 'a', props: { href: '/bar' } },
      { type: 'span', props: { onClick: e => alert("Hi"), children: ['ffff'] } }
    ]
  }
}

render(element, parent)