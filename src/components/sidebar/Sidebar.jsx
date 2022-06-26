import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import "./sidebar.css";
import SidebarChat from "../sidebarchat/SidebarChat";
import { useState,useEffect } from "react";
import db from "../../firebase";
import { useStateValue } from "../../context/StateProvider";
import firebase from "firebase";

const Sidebar = () => {
  const[rooms,setRooms] = useState([]);
  const [{user},dispatch]=useStateValue();

  useEffect(() => {
    db.collection("rooms").onSnapshot(snapshot=>{
      setRooms(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    })
  }, [])
  console.log(rooms)

  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <Avatar src={user.photoURL} onClick ={e=>firebase.auth().signOut()}/>

        <div className="sidebarHeaderRight">
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
      <div className="sidebarSearch">
        <div className="sidebarSearchIcon">
          <SearchIcon />
          <input type="text" placeholder="Search or Start a new Chat.." />
        </div>
      </div>
      <div className="sidebarChats">
        <SidebarChat addnewchat/>
        {
          rooms.map((room)=>{
            return <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
          })
        }
      
      </div>
    </div>
  );
};

export default Sidebar;
