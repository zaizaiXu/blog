---
title: WebSocket
---
WebSocket

WebSocket 是一种在客户端和服务器之间建立持久化连接的协议，它允许双方实时地交换数据。由于 WebSocket 连接是长时间保持的，因此需要一种机制来确保连接的稳定性和可靠性，这就是`心跳机制`。

## 心跳机制的作用
WebSocket心跳机制的作用主要有以下几点：
保持WebSocket连接不被断开。

检测WebSocket连接状态，及时处理异常情况。

减少WebSocket连接及服务器资源的消耗。

## 代码
```ts
// 首先,需要创建一个WebSocket连接
var ws;
var WS_URL = window.location.host + ${base} + "/websocket"
// 如果页面是https,那么必须走wss协议, 否则走ws协议
if (location.protocol == 'http:') {
  ws = new WebSocket("ws://" + WS_URL);
} else {
  ws = new WebSocket("wss://" + WS_URL);
}
// 连接成功后,会触发onopen回调
ws.onopen = function(event) {
  console.log("websocket onopen ...");
  // 加入home房间
  ws.send(JSON.stringify({room:'home',"action":"join"}));
};
// 收到服务器发来的信息时触发的回调
ws.onmessage = function(event) {
  console.log("websocket onmessage", event.data);
  var re = JSON.parse(event.data);
  if (re.action == "notify") {
    // 弹个浏览器通知
  } else if (re.action == "msg") {
    // 插入到聊天记录中
  }
};

// 定时发个空消息,避免服务器断开连接
function ws_ping() {
  if (ws) {
    ws.send("{}"); // TODO 断线重连.
  }
}
setInterval("ws_ping()", 25000); // 25秒一次就可以了
```


