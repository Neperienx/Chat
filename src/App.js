import './App.css';
import Chat from "./Chat";
import io from 'socket.io-client'
import { useState } from 'react';

//we want initialized the url of our server to localhost:3001 in the backend (server). Now we connect the front end (client) to the server by using the same as the listen port
const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] =useState("")
  const [room, setRoom] =useState("")
  const [showChat, setShowChat] =useState(false)

  //write a function to join a room using the const <func> = () =>{}
  const joinRoom = () => {
    if(username !=="" && room !== ""){
      //if we have a username and an ID we send the room ID stored in "room" to the function "join_room" from the server side
      socket.emit("join_room", room);
      setShowChat(true);
    }

  }

  return (
    <div className="App">
      {/*we only want to show the chat when we are in a room */}
      {!showChat ? (
      <div className="joinChatContainter">
        <h3> Join A Chat</h3>
        {/* onChange will call setUsername and will set the username to the value of the event.target.value */}
        <input type="text" placeholder = "Name" onChange= {(event)=>{setUsername(event.target.value)}}/>
        {/* the sockets will allow two people in a room to chat with each other, if you have the room name you can see all the data in the room!!!! */}
        <input type="text" placeholder = "Room ID" onChange= {(event)=>{setRoom(event.target.value)}}/>
        {/* onClick we want to call the joinRoom function in the client who will call the "Join_room" function on the server side*/}
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      ) : (
      <Chat socket = {socket} username = {username} room = {room}/>
      )}
    </div>
  );
    
}

export default App;
