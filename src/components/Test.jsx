/** @jsx createElement */
import createElement from '../element'

const Test = (
  <div id="container">
    <input value="foo" type="text" />
    <a href="/bar">bar</a>
    <span onClick={() => alert("Hi")}>click me</span>
  </div>
)

export default Test