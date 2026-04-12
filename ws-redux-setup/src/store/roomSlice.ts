import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Client = {
  clientId: string;
  message: string | null;
};

type RoomState = {
  roomMessage: string | null;
  clients: {
    byId: Record<string, Client>;
    allIds: string[];
  };
};

const initialState: RoomState = {
  roomMessage: null,
  clients: {
    byId: {},
    allIds: []
  }
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomMessage(state, action: PayloadAction<string>) {
      state.roomMessage = action.payload;

      Object.values(state.clients.byId).forEach(c => {
        c.message = null;
      });
    },

    setClientMessage(
      state,
      action: PayloadAction<{ clientId: string; message: string }>
    ) {
      const { clientId, message } = action.payload;

      if (!state.clients.byId[clientId]) {
        state.clients.byId[clientId] = { clientId, message: null };
        state.clients.allIds.push(clientId);
      }

      state.clients.byId[clientId].message = message;
      state.roomMessage = null;
    },

    clearRoom(state) {
      state.roomMessage = null;
      state.clients = { byId: {}, allIds: [] };
    }
  }
});

export const { setRoomMessage, setClientMessage, clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
