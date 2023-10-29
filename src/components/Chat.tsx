import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";

export default function Chat() {
  const socket = useSocket();
  const { id: roomId } = useParams();
  const {
    userInfo: { username },
  } = useUserContext();
  type message = {
    isWhat: string;
    senderId: string;
    senderNickname: string;
    message: string;
    timestamp: number;
  };
  const [chatLog, setChatLog] = useState<message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        console.log(data);
        setChatLog([...chatLog, data.data]);
      });

      socket.on("user_left", (data) => {
        setChatLog([...chatLog, data.data]);
      });
      socket.on("user_joined", (data) => {
        setChatLog([...chatLog, data.data]);
      });
    }
    return () => {
      socket && socket.off("receive_message");
    };
  }, [socket, chatLog]);
  console.log(chatLog);

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket &&
      inputRef.current &&
      socket.emit("send_message", {
        roomId,
        message: inputRef.current.value,
      });
  };

  return (
    <StContainer>
      <StChatLog>
        {chatLog.map((chatLog) => (
          <StChatWrap>
            {chatLog.isWhat === "notice" ? (
              <StChat>{chatLog.message}</StChat>
            ) : (
              <>
                <StNick $isMe={chatLog.senderId === username}>
                  {chatLog.senderNickname}
                </StNick>
                <StChat>{`: ${chatLog.message}`}</StChat>
              </>
            )}
          </StChatWrap>
        ))}
      </StChatLog>
      <StForm onSubmit={onSendMessage}>
        <StInput type="text" ref={inputRef} />
        <StButton>전송</StButton>
      </StForm>
    </StContainer>
  );
}

const StContainer = styled.section``;
const StChatLog = styled.div``;
const StChatWrap = styled.div`
  display: flex;
  align-items: center;
`;
const StNick = styled.span<{ $isMe: boolean }>`
  margin-right: 0.3rem;
  ${({ $isMe }) => ($isMe ? "color: black" : "color : skyblue")}
`;
const StChat = styled.p``;
const StForm = styled.form``;
const StInput = styled.input``;
const StButton = styled.button``;
