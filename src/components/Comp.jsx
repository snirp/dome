/** @jsx createElement */
import createElement from '../element'
import Component from '../component'

export default class Comp extends Component {
  state = {
    a: 'trr'
  }

  handleClick = () => {
    this.setState({
      a: 'aaaaaaa'
    })
  }

  render() {
    console.log('Comp render method called')
    return (
      <ul>
        <li className="test">hoi</li>
        <li>dag</li>
        <li onClick={this.handleClick}>{this.props.foo} - {this.state.a}</li>
      </ul>
    )
  }
}