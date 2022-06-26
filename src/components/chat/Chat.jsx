import { Avatar, IconButton } from "@material-ui/core";
import React,{useEffect,useState} from "react";
import "./chat.css";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../context/StateProvider";

const Chat = () => {
  const {roomId}=useParams();
  const [roomName, setRoomName] = useState("");
  const [input, setInput] = useState("");
  const [messages,setMessages] = useState([]);
  const [{user},dispatch]=useStateValue();

  useEffect(() => {
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>(setRoomName(snapshot.data().name)))
    }
    db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp","asc").onSnapshot((snapshot) =>{
      setMessages(snapshot.docs.map(doc=>doc.data()))
    })
    
  }, [roomId])
  console.log(messages)


  const sendMessage = (e)=>{
    e.preventDefault();
    if(input===""){
      return alert("please enter your message")
    }
    db.collection("rooms").doc(roomId).collection("message").add({
      name:user.displayName,
      message:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });

    
    setInput("");
  }


  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar />
        <div className="chatHeaderInfo">
          <h3>{roomName}</h3>
          <p>last seen</p>
        </div>
        <div className="headerRight">
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
      <div className="chatBody">
      {
        messages.map(message=>(
          <p className={`ChatMessage ${user.displayName==message.name && "chatRecieve"}`}>
          <span className="chatName">{message.name}</span>
          {message.message}
          <span className="chatTime">
            {
              new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
            }
          </span>
        </p>

        ))
      }
        
        {/* <p className="ChatMessage chatRecieve">
          <span className="chatName">Mihir</span>
          This is test
          <span className="chatTime">12:00 AM</span>
        </p>
        <p className="ChatMessage chatRecieve">
          <span className="chatName">Mihir</span>
          This is test
          <span className="chatTime">12:00 AM</span>
        </p>
        <p className="ChatMessage ">
          <span className="chatName">Mihir</span>
          This is test
          <span className="chatTime">12:00 AM</span>
        </p> */}
      </div>
      <div className="chatFooter">
        <EmojiEmotionsIcon />
        <AttachFileIcon />
        <form onSubmit={sendMessage}>
          <input type="text" placeholder="Type Your Message" value={input} onChange={e=>setInput(e.target.value)}/>
          <input type="submit" />
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
