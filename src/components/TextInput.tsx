import * as React from 'react'
import { ReactComponent as InputIcon } from '../assets/envelope-solid.svg'
import './TextInput.css'

const TextInput = () => {
  return (
    <div style={{bottom: 20}} className='text-field-shell'>
      <input type="text" id='9' className='text-field'/>
      <InputIcon className='input-icon'/>
    </div>
  )
}



export default TextInput