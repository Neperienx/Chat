import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";


//the component chat will accept a prop named socket, username, room
function Chat({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState("");
    //we want to save the message list to plot them in the chat
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentMessage!==""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            //console.log("send",currentMessage);
            
            //we emit from the client side to the server the messageData object to the send_message event
            await socket.emit("send_message", messageData)
            //we want to loog the sent messages 
            setMessageList([...messageList,messageData]);//setMessageList((list)=>[...list,messageData]);
            //console.log("send_LIST",messageList);
            setCurrentMessage("");
        }
    }

    // is listening to changes to our socket when receive_message is called
    //useEffect(( )=>{
        socket.on("receive_message", (data)=>{
            //console.log("receive",data);
            //we want to log the received messages
            setMessageList([...messageList,data]);//setMessageList((list)=>[...list,data]);
            //console.log("receive_LIST",messageList);
        })
    //},[]);//,[socket]);

    return (
        <div className="chat-window">
            <div className = "chat-header">
                <p>Live Chat</p>
            </div>
            <div className = "chat-body">
                <ScrollToBottom className="message-container">
                {/*we want to loop in the message list and plot the messages: "messageContent.message"*/}
                {
                messageList.map((messageContent)=>{
                    return <div className="message" id = {username === messageContent.author ? "you" : "other"}> 
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}
                                </p>
                            </div>
                            <div className="message-meta">
                                <p id ="time">{messageContent.time}</p>
                                <p id = "author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>;
                })}
                </ScrollToBottom>
            </div>
            <div className = "chat-footer">
                {/*we want to set the message as soon as the user tipes something. when the user presses enter we want to call the function sendMessage*/ }
                <input type="test" value = {currentMessage} placeholder="Hey Bg..." onChange= {(event)=>{setCurrentMessage(event.target.value)}} onKeyPress={(event) =>{event.key === "Enter" &&sendMessage()}}/>
                {/*on clicking the button we want to call the function sendMessage that will emit the message object to the server Socket*/ }
                <button onClick= {sendMessage}>&#9658;</button>
            </div>
            {/*<button onClick= {console.log("testsynchro",messageList)}>&#9659;</button>*/}
        </div>
    );
}
export default Chat