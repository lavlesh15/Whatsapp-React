import React, { useState, useEffect } from 'react'
import { Avatar } from "@material-ui/core";
import db from './firebase';
import {Link } from "react-router-dom";

function SidebarChats({id , name,  addNewChat }) {

    const [seed, setSeed] = useState('');
    const [messages , setMessages] = useState("");


    useEffect(()=> {

        if(id)
        {
            db
            .collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }


    },[])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
         const roomName = prompt("Please Enter Name for the Room Chat");

         if(roomName)
         {
            db.collection('rooms').add({
                Name : roomName,
            });
         }
     };

    return !addNewChat ? (
        <Link to={`/rooms/${id}` }>

        <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />

        <div className="sidebarChat_info">
            <h2>
               {name}
            </h2>
            <p>
               {messages[0]?.text}
            </p>

        </div>
    </div>

        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat </h2>

        </div>
    );
}

export default SidebarChats
