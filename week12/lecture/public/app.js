import { html, render } from 'https://unpkg.com/lit-html@3.1.0/lit-html.js';
import { ref, createRef } from 'https://unpkg.com/lit-html@3.1.0/directives/ref.js';
import { when } from 'https://unpkg.com/lit-html@3.1.0/directives/when.js';
import './chat.js';

class AppRoot extends HTMLElement {
  #showRoot = null;
  #users = null;
  #inputRef = createRef();

  constructor() {
    super();
    this.#showRoot = this.attachShadow({ mode: 'closed' });
    this.loadUsersAndRender();
  }
  
  getTemplate() {
    const userListFactory = () => html`<ul>
        ${this.#users.map(user => html`<li>${user.firstName}</li>`)}
      </ul>`;
    const noUsersFactory = () => html`<div>No users loaded</div>`;

    return html`
      <h1>This is my first web component</h1>
      ${when(Array.isArray(this.#users), userListFactory, noUsersFactory)}
      <button @click=${this.loadUsersClickHandler.bind(this)}>Reload users</button>
      <input ${ref(this.#inputRef)} type="text" placeholder="add user name" />
      <button @click=${this.addUserClickHandler.bind(this)}>Add user</button>
      <br>
      <br>
      <br>
      
      
      
      <app-chat></app-chat>
    `;
  }

  loadUsersClickHandler() {
    this.loadUsersAndRender();
  }

  addUserClickHandler() {
    const fistName = this.#inputRef.value.value;
    this.#inputRef.value.value = '';
    this.addUser(fistName).then(() => {
      this.loadUsersAndRender();
    });
  }

  loadUsers() {
    return fetch("/api/users").then(res => res.json()).then(users => {
      this.#users = users;
    });
  }

  loadUsersAndRender() {
    this.loadUsers().then(() => {
      this.render();
    });
  }

  addUser(firstName) {
    return fetch("/api/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ firstName })
    }).then(res => res.json());
  }

  render() {
    render(this.getTemplate(this), this.#showRoot);
  }
}

customElements.define('app-root', AppRoot)
