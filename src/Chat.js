import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import './Chat.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';


function Chat() {

    const [seed, setSeed] = useState('');
    const [input , setInput] = useState('');
    const {roomId} = useParams();
    const [roomName , setRoomName] = useState("");
    const [messages , setMessages] = useState([]);
    const [{user} , dispatch] = useStateValue();

    useEffect(() => {
       if(roomId)
       {
           db.collection('rooms')
           .doc(roomId)
           .onSnapshot((snapshot) => 
           setRoomName(snapshot.data().Name));
           setSeed(Math.floor(Math.random() * 5000));

            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
       }
       
    }, [roomId]);

    // useEffect(() => {
       
    // }, []);


    const sendmsg = (e) => {
       e.preventDefault();
       console.log("you Typed ", input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            text : input,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })

       setInput('');
    };


    return (
        <div className='chat'>

            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="chat_headerinfo">
                    <h3>
                        {roomName}
                    </h3>
                    <p> last seen {" "} 
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}


                    </p>

                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>

            </div>

            <div className="chat_body">

                {messages.map((message) => (

                    <p className={`chat_message ${message.name ===user.displayName && 'chat_recieve '}`}>

                    <span className="chat_name">{message.name} </span>
                    {message.text}

                    <span className="chat_timestamp">
                     {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>

                    </p>

                ))}

   
            </div>

            <div className="chat_footer">

        
        <InsertEmoticonIcon/>

        <form>

        <input value={input} 
        onChange={(e) => setInput(e.target.value) } 
        type="text" 
        placeholder="Type a message" />
        <button type="submit" onClick={sendmsg} >Send A message </button>

        </form>

        
        <MicIcon/>

            </div>
        </div>
    )
}

export default Chat
