/** @jsx createElement */
import createElement from './element'
import { render } from './dom'
import Comp from './components/Comp.jsx'

const parent = document.getElementById('root')

render(<Comp foo='ddssdsd'/>, parent)