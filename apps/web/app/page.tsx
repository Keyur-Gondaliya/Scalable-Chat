"use client";
import React, { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";
import Flow from "./Components/Flow";
type Props = {};

function page({}: Props) {
  const { sendMessage, messages, status } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div className={classes["main-container"]}>
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
      <Flow status={status} />
    </div>
  );
}

export default page;
