"use client";
import React, { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";
type Props = {};

function page({}: Props) {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div className={classes["container-msg"]}>
      <div>
        {messages.map((e, i) => (
          <li key={e + i}>{e}</li>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
      >
        <input
          className={classes["chat-input"]}
          placeholder="Enter Message."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <button className={classes["button"]} type="submit">
          send
        </button>
      </form>
    </div>
  );
}

export default page;
