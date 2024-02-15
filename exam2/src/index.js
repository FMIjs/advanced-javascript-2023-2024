import { html, render } from "lit-html";

const styles = `
  ul { padding: 0; }
`;
const template = (ctx) => html`
  <style>
    ${styles}
  </style>
  <div>Process Data</div>
  <input
    type="text"
    @keyup=${ctx.inputKeyupHandler}
    .value=${ctx.pidInputValue}
  />
  <button @click=${ctx.startPolling}>Start Polling</button>
  <button @click=${ctx.stopPolling}>Stop Polling</button>
  <ul>
    ${!!ctx.fileData.length
      ? ctx.fileData.map((data) => html`<li>${data}</li>`)
      : "No data"}
  </ul>
`;

export class FileData extends HTMLElement {
  static selector = "fjs-file-data";

  pidInputValue = "";
  fileData = [];

  socket = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.openFileDataSocket();

    this.render();
  }

  openFileDataSocket() {
    this.socket = io("http://localhost:8082");
    // some info:
    // -- send messages with `this.socket.emit('message', 'test message');`
    // -- listen for messages with `this.socket.on('message', msg => ...);`

    console.log(this.socket);

    this.socket.on("message", (msg) => this.handleMessage(msg));
  }

  handleMessage(msg) {
    this.fileData.push(msg);
    this.render();
  }
  clearMessages() {
    this.fileData = [];
    this.render();
  }

  inputKeyupHandler = (event) => {
    const target = event.target;
    this.pidInputValue = target.value;
  };

  startPolling = () => {
    console.log("start polling");
    console.log(this.pidInputValue);
    // ...
  };

  stopPolling = () => {
    console.log("stop polling");
    // ...
  };

  render() {
    render(template(this), this.shadowRoot);
  }
}

customElements.define(FileData.selector, FileData);
