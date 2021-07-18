import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChats from "./SidebarChats";
import "./SidebarChat.css";
import db from './firebase';
import './Sidebar.css';
import { useStateValue } from './StateProvider';

function Sidebar() {



  const [rooms, setRooms] = useState([]);
  const[{user}, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe =  db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc =>
      ({
        id: doc.id,
        data: doc.data(),
      })
      ))

    ));

    return () =>
    {
      unsubscribe();
    }


  }, []);


  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headright">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>

        </div>


      </div>

      <div className="sidebar_search">

        <div className="sidebar_searchcontainer">

          <SearchIcon />
          <input type="text" placeholder="Search or Start New Chat" />

        </div>

      </div>

      <div className="sidebar_chats">
        <SidebarChats addNewChat />
        {rooms.map(room =>
        (
          <SidebarChats key={room.id} id={room.id} name={room.data.Name} />
        )
        )}


      </div>


    </div>
  )
}

export default Sidebar
