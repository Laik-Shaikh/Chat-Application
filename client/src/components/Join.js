import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css'

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('')

    const changeName = (event) => {
        setName(event.target.value)
    }

    const changeRoom = (event) => {
        setRoom(event.target.value)
    }

    return(
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Login</h1>
                <div>
                    <input className='joinInput' type="text" placeholder='Enter Name' onChange={changeName} />
                </div>
                <div>
                    <input className='joinInput mt-20' type="text" placeholder='Enter Room' onChange={changeRoom} />
                </div>
                <Link onClick={(e) => (!name || !room)? e.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='joinButton mt-20' type='submit' >JOIN</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;