import React from 'react'

import closeIcon from '../assests/closeIcon.png'
import onlineIcon from '../assests/onlineIcon.png'

import './Infobar.css'

const Infobar = ({ room, name }) => {
    
    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon} alt="online icon" />
                <h3>{room}</h3>
            </div>
            <div>
                <h3>You: {name}</h3>
            </div>
            <div className='rightInnerContainer'>
                <a href='/'><img src={closeIcon} alt="close icon " /></a>
            </div>
        </div>
    )
}

export default Infobar;