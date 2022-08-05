import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import queryString from 'query-string'

import Messages from './Messages'
import TextContainer from './TextContainer'
import Infobar from './Infobar'
import Input from './Input'


import './Chat.css'

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    
    const ENDPOINT = 'http://localhost:5000'; 

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);
        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)
        
        socket.emit('onJoin', { name, room }, (error) => {
            if(error){
                alert(error)
            }
        })

    }, [ENDPOINT, window.location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [ ...messages, message ])
        })

        socket.on('roomData', ({ user }) => {
            setUsers(user)
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    

    return(
        <div className='outerContainer'>
            <div className='container'>
                <Infobar room={room} name={name} />
                <Messages messages={messages} name={name} /> 
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;