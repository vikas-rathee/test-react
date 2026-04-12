export enum EventType {
  ROOM_MESSAGE = "ROOM_MESSAGE",
  CLIENT_MESSAGE = "CLIENT_MESSAGE",
  ACK = "ACK"
}

export type RoomMessagePayload = {
  message: string;
};

export type ClientMessagePayload = {
  clientId: string;
  message: string;
};

export type AckPayload = {
  messageId: string;
  successIds: string[];
  failedIds: string[];
};

type BaseMessage<T extends EventType, P> = {
  eventType: T;
  messageId: string;
  senderId: string;
  receiverIds: string[];
  payload: P;
};

export type WSMessage =
  | BaseMessage<EventType.ROOM_MESSAGE, RoomMessagePayload>
  | BaseMessage<EventType.CLIENT_MESSAGE, ClientMessagePayload>
  | BaseMessage<EventType.ACK, AckPayload>;
