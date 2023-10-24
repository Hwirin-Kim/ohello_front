import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useSocket } from "../context/SocketContext";

export default function Chat() {
  const socket = useSocket();
  const { id: roomId } = useParams();

  const [chatLog, setChatLog] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        setChatLog([...chatLog, data.message]);
      });
    }
    return () => {
      socket && socket.off("receive_message");
    };
  }, [socket, chatLog]);

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
          <StChat>{chatLog}</StChat>
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
const StChat = styled.p``;
const StForm = styled.form``;
const StInput = styled.input``;
const StButton = styled.button``;
