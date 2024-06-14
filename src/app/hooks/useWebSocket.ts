import {useEffect, useRef, useCallback} from 'react';

const useWebSocket = (
  url: string,
  onMessage: (data: any) => void,
  debounceInterval = 300,
) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const messageQueue = useRef([]);
  const lastMessageTime = useRef(Date.now());

  const processMessageQueue = useCallback(() => {
    const now = Date.now();
    if (now - lastMessageTime.current >= debounceInterval) {
      while (messageQueue.current.length > 0) {
        const message = messageQueue.current.shift();
        onMessage(message);
      }
      lastMessageTime.current = now;
    }
  }, [debounceInterval, onMessage]);

  const connectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      setTimeout(() => {
        try {
          ws.current?.send(
            JSON.stringify({
              method: 'SUBSCRIBE',
              params: ['btcusdt@aggTrade'],
              id: 1,
            }),
          );
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }, 100);
    };

    ws.current.onmessage = event => {
      const data = JSON.parse(event.data);
      messageQueue.current.push(data);
      processMessageQueue();
    };

    ws.current.onerror = error => {
      console.error('WebSocket Error: ', error);
    };

    ws.current.onclose = event => {
      console.log('WebSocket connection closed', event);
      if (event.code !== 1000) {
        console.log('Attempting to reconnect...');
        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
        }
        reconnectTimeout.current = setTimeout(() => {
          connectWebSocket();
        }, 5000); // try to reconnect after 5 seconds
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close(1000, 'Component unmounting');
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [url, processMessageQueue]);

  return ws.current;
};

export default useWebSocket;
