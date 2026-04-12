import { wsService } from "../services/wsService";
import { store } from "../store/store";
import { setRoomMessage, setClientMessage } from "../store/roomSlice";
import { EventType, WSMessage } from "../types/wsTypes";

export function initWSListeners() {
  wsService.subscribe((msg: WSMessage) => {
    switch (msg.eventType) {
      case EventType.ROOM_MESSAGE:
        store.dispatch(setRoomMessage(msg.payload.message));
        break;

      case EventType.CLIENT_MESSAGE:
        store.dispatch(
          setClientMessage({
            clientId: msg.payload.clientId,
            message: msg.payload.message
          })
        );
        break;

      case EventType.ACK:
        console.log("ACK received", msg.payload);
        break;
    }
  });
}
