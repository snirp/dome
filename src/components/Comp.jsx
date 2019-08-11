/** @jsx createElement */
import createElement from '../element'
import Component from '../component'

// const element = {
//   type: "div",
//   props: {
//     id: "container",
//     children: [
//       { type: "input", props: { value: "foo", type: "text" } },
//       { type: "a", props: { href: "/bar" } },
//       { type: "span", props: {} }
//     ]
//   }
// }


export default class Comp extends Component {
  render() {
    console.log('Comp render method called')
    return (
      <ul>
        <li>hoi</li>
        <li>dag</li>
        <li>{this.props.foo}</li>
      </ul>
    )
  }
}