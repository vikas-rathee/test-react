import { WSMessage } from "../types/wsTypes";

type Listener = (msg: WSMessage) => void;

class WSService {
  private socket: WebSocket | null = null;
  private url = "";
  private listeners: Listener[] = [];
  private queue: WSMessage[] = [];

  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(url: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

    this.url = url;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;

      this.queue.forEach(msg => {
        this.socket?.send(JSON.stringify(msg));
      });
      this.queue = [];
    };

    this.socket.onmessage = (event) => {
      const data: WSMessage = JSON.parse(event.data);
      this.listeners.forEach(cb => cb(data));
    };

    this.socket.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 10000);
        setTimeout(() => this.connect(this.url), delay);
      }
    };
  }

  send(message: WSMessage) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.queue.push(message);
    }
  }

  subscribe(cb: Listener) {
    this.listeners.push(cb);
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    this.queue = [];
    this.reconnectAttempts = 0;
  }
}

export const wsService = new WSService();
