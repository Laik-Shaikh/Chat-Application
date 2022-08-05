import React from 'react'

import './Input.css'

const Input = ({ message, setMessage, sendMessage}) => {

    return (
        <form className='form'>
            <input 
                placeholder='Enter a Message'
                type="text"
                className='input'
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={event => event.key === 'Enter'? sendMessage(event): null}
            />
            <button className='sendButton' onClick={(e) => sendMessage(e)}>Send</button>
        </form>
    )

}

export default Input