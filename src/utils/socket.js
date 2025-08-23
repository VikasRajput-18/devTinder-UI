import { io } from "socket.io-client";
import { BASE_URL } from "./constant"


export const createSocketConnection = () => {
    if (location.hostname === "location") {
        return io(BASE_URL, {
            withCredentials: true
        });
    } else {
        return io("/", { path: "/api/socket.io" })
    }
}


