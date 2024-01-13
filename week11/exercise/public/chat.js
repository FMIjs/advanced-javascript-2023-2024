import { html, render } from "https://unpkg.com/lit-html@3.1.0/lit-html.js";
import { when } from "https://unpkg.com/lit-html@3.1.0/directives/when.js";
import {
  ref,
  createRef,
} from "https://unpkg.com/lit-html@3.1.0/directives/ref.js";

import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

class Chat extends HTMLElement {
  #showRoot = null;
  #socket = null;
  #chatInputRef = createRef();
  #userInputRef = createRef();

  currentUser = null;
  messages = [];

  constructor() {
    super();

    this.#showRoot = this.attachShadow({ mode: "closed" });
    this.#socket = io("http://localhost:8080");
    this.#socket.on("chat-message", (message) => {
      this.messages.push(message);
      this.render();
    });
    this.#socket.on("system-message", console.warn);
    this.#socket.on("message-history", (messages) => {
      this.messages = messages;
      this.render();
    });

    this.render();
  }

  getTemplate() {
    const method = this.currentUser ? "getChatTemplate" : "getUserTemplate";
    return this[method]();
  }

  getUserTemplate() {
    return html`
      <h3>Please log in</h3>
      <input
        ${ref(this.#userInputRef)}
        type="text"
        placeholder="enter username"
      />
      <button @click=${this.loginHandler.bind(this)}>Login</button>
    `;
  }

  getChatTemplate() {
    const noMessagesFactory = () => html`<div>No messages yet</div>`;
    const messagesListFactory = () =>
      html`<ul>
        ${this.messages.map(this.parseMessageData).map((messageData) => html`<li>${messageData}</li>`)}
      </ul>`;
    return html`
      <h3>Hello, ${this.currentUser.firstName}!</h3>
      <div>
        ${when(
          this.messages.length > 0,
          messagesListFactory,
          noMessagesFactory
        )}
      </div>
      <input
        ${ref(this.#chatInputRef)}
        type="text"
        placeholder="enter message"
      />
      <button @click=${this.sendMessageHandler.bind(this)}>Send message</button>
    `;
  }

  sendMessageHandler() {
    const message = this.#chatInputRef.value.value;
    if (!message) {
      return;
    }
    this.#chatInputRef.value.value = "";
    this.#socket.emit("chat-message", { userName: this.currentUser.firstName, message });
  }

  parseMessageData = (messageData) => {
    const userName = messageData.userName === this.currentUser.firstName ? "You" : messageData.userName;
    return `${userName}: ${messageData.message}`;
  }

  loginHandler() {
    const username = this.#userInputRef.value.value;
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName: username }),
    })
      .then((res) => res.json())
      .then(user => {
        this.currentUser = user;
        this.render();
      });
  }

  render() {
    render(this.getTemplate(this), this.#showRoot);
  }
}

customElements.define("app-chat", Chat);
