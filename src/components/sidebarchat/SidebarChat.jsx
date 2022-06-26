import { Avatar } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import "./sidebarchat.css";
import db from "../../firebase.js";
import { Link } from "react-router-dom";

const SidebarChat = ({ name, id, addnewchat }) => {
  const [seed, setSeed] = useState("");
  const [lastmessage,setLastmessage] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
   // db.collection("rooms").doc(id).collection("message").orderBy("timestamp","desc").onSnapshot(snapshot=>setLastmessage(snapshot.doc.map(doc=>doc.data)))
  }, []);
  console.log(lastmessage)

  const createChat = () => {
    const room = prompt("please enter room name");
    alert(room);

    db.collection("rooms").add({
      name: room,
    });
  };

  return !addnewchat ? (
    <Link to={`/rooms/${id}`} className="lnk">
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChatInfo">
          <h2>{name}</h2>
          <p>hello from</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
