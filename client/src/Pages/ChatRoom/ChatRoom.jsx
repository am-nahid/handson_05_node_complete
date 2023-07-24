
import React, { useEffect, useState } from "react";
import style from "./chatroom.module.css";
import socketClient from 'socket.io-client'
import { useLocation } from "react-router-dom";

function ChatRoom() {
  const Location = useLocation();
  const [message, setMessage] = useState("");
  const [messageStore, setMessageStore] = useState([]);
  const [socket, setSocket] = useState(null);
  const [oppResMsgs, setOppResMsgs] = useState([]);

  const userName = Location.state.userName;
  const roomName = Location.state.roomName;


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    const socket = socketClient('https://node-handson-05-backend.onrender.com');
    setSocket(socket);
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('user_entered_chat', { userName, roomName });
      socket.on('chat_message', (val) => {
        setOppResMsgs(prevMsgs => [...prevMsgs, val]);
        console.log(val);
      });
    }
  }, [socket, userName, roomName]);

  

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (socket && message.trim() !== "") {
      const messageObj = {
        userName,
        roomName,
        message: message.trim(),
      };
      socket.emit('chat_message', messageObj);
      setMessage("");
    }
  };

  return (
    <div>
      <div className={style.cnt}>
        <div className={style.box}>
          <div className={style.top_header}>
            <h1 className={style.heading}>{roomName}</h1>
            <h3 className={style.name_heading}>{userName}</h3>
          </div>
          <div className={style.msg_cntnr}>
            {/* {messageStore.map((myMsgs, index) => (
              <div
                key={index}
                className={
                  myMsgs.userName === userName
                    ? `${style.msg_display} ${style.right}`
                    : `${style.msg_display} ${style.left}`
                }
              >
                 <span
                className={style.display_name}
                >{myMsgs.message}</span>
              </div>
            ))} */}
            {oppResMsgs.map((item, index) => (
              <div
                key={index}
                className={
                  item.userName === userName
                    ? `${style.msg_display} ${style.right}`
                    : `${style.msg_display} ${style.left}`
                }
              >
             
                <span className={
                    item.userName === userName
                      ? ` ${style.display_name}`
                      : ` ${style.disp_none}`
                  }>{item.userName}</span>
                <span
                  className={
                    item.userName === userName
                      ? ` ${style.blue}`
                      : ` ${style.white}`
                  }
                >{item.message}</span>
              </div>
            ))}
          </div>
          <div className={style.bottom}>
            <input
              type="text"
              className={style.input}
              placeholder="Type a message"
              onChange={handleMessage}
              name='message'
              
              onKeyDown={handleKeyPress}
              value={message}
            />
            <button className={style.btn} onClick={handleSubmit}>
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;




// import React, { useEffect, useState } from "react";
// import style from "./chatroom.module.css";
// import socketClient from 'socket.io-client'
// import { useLocation } from "react-router-dom";

// function ChatRoom() {
//   const Location = useLocation();
//   const [message, setMessage] = useState("");
//   const [messageStore, setMessageStore] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [oppResMsgs, setOppResMsgs] = useState([]);

//   const userName = Location.state.userName;
//   const roomName = Location.state.roomName;

//   useEffect(() => {
//     const socket = socketClient('http://localhost:9090');
//     setSocket(socket);
//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.emit('user_entered_chat', { userName, roomName });
//       socket.on('chat_message', (val) => {
//         setOppResMsgs(prevMsgs => [...prevMsgs, val]);
//         // console.log(val);
//       });
//     }
//   }, [socket, userName, roomName]);

//   const handleMessage = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (socket && message.trim() !== "") {
//       const messageObj = {
//         userName,
//         roomName,
//         message: message.trim(),
//       };
//       console.log(message);
//       setMessageStore(prevMsgs=>[...prevMsgs, message])
//       socket.emit('chat_message', messageObj);
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <div className={style.cnt}>
//         <div className={style.box}>
//           <div className={style.top_header}>
//             <h1 className={style.heading}>{roomName}</h1>
//             <h3 className={style.name_heading}>{userName}</h3>
//           </div>
//           <div className={style.msg_cntnr}>
//             {messageStore.map((myMsgs, index) => (
          
//               <div
//               key={index}
//               className={ `${style.msg_display} ${style.right}`
                
//               }
//             >
//               {console.log("messageStore", messageStore)}
             
//                  <span
//                 className={style.blue}
//                 >{myMsgs}</span>
//               </div>
//             ))}
//             {oppResMsgs.filter((notMsg)=>notMsg.userName!==userName).map((item, index) => (
          
//               <div
//                 key={index}
//                 className={
//                       `${style.msg_display} ${style.left}`
//                 }
//               >
//                 {console.log("oppResMsgs", oppResMsgs)}
//                 <span className={
//                     item.userName === userName
//                       ? ` ${style.display_name}`
//                       : ` ${style.disp_none}`
//                   }>{item.userName}</span>
//                 <span
//                   className={
//                     item.userName === userName
//                       ? ` ${style.blue}`
//                       : ` ${style.white}`
//                   }
//                 >{item.message}</span>
//               </div>
//             ))}
//           </div>
//           <div className={style.bottom}>
//             <input
//               type="text"
//               className={style.input}
//               placeholder="Type a message"
//               onChange={handleMessage}
//               name='message'
//               value={message}
//             />
//             <button className={style.btn} onClick={handleSubmit}>
//               send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatRoom;
