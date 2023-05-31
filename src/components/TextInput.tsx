import { ReactComponent as InputIcon } from '../assets/icons/envelope-solid.svg'
import './TextInput.css'

const TextInput = () => {
  return (
    <div className="container">
      <input type="text" id='9' className="input"/>
      <InputIcon className="icon"/>
    </div>
  )
}

export default TextInput