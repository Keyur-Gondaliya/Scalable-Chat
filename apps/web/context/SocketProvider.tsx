"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
interface SocketProviderProps {
  children?: React.ReactNode;
}
interface ISocketContext {
  sendMessage: (msg: string) => any;
  messages: string[];
  status: ServiceStatus;
}
export interface ServiceStatus {
  frontend: boolean;
  server: boolean;
  redisSub: boolean;
  redisPub: boolean;
  kafka: boolean;
  postgres: boolean;
}

const SocketContext = createContext<ISocketContext | null>(null);
export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("no context state null");
  return state;
};
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState<ServiceStatus>({
    frontend: false,
    server: false,
    redisSub: false,
    redisPub: false,
    kafka: false,
    postgres: false,
  });
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log("Sent Message to Server", msg);
      setStatus((prev) => ({ ...prev, frontend: true }));

      if (socket) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );
  const onMessageRec = useCallback((msg: string) => {
    console.log(
      "Message Recived From Server to FrontEnd (While Data is adding in Redis and Kafka)",
      msg
    );
    setStatus((prev) => ({ ...prev, server: true }));

    const { message } = JSON.parse(msg) as { message: string };
    setMessages((prev) => [...prev, message]);
  }, []);
  useEffect(() => {
    const _socket = io(process.env.NEXT_PUBLIC_BASE_URL || "");
    _socket.on("message", onMessageRec);
    _socket.on("postgres_save", (msg: string) => {
      console.log("Messaage Saved in Postgres.");
      setStatus((prev) => ({ ...prev, postgres: true }));
    });
    _socket.on("kafka_sent", (msg: string) => {
      console.log("Message Reach Kafka via Server");
      setStatus((prev) => ({ ...prev, kafka: true }));
    });
    _socket.on("redis_sent_pub", (msg: string) => {
      console.log("Message Sent to Redis pub via Server");
      setStatus((prev) => ({ ...prev, redisPub: true }));
    });
    _socket.on("redis_sent_sub", (msg: string) => {
      console.log("Message Sent to Server Via Redis Sub");
      setStatus((prev) => ({ ...prev, redisSub: true }));
    });
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      _socket.off("message");
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages, status }}>
      {children}
    </SocketContext.Provider>
  );
};
