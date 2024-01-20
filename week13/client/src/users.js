import { render, html } from 'lit-html';
import { createContextForComponent } from "./context";
import { store } from './store';

export class AppUsers extends HTMLElement {
  static selector = 'app-users';
  #showRoot = null;
  context = createContextForComponent(this, { isLoading: false, error: null, users: null });

  constructor() {
    super();
    this.#showRoot = this.attachShadow({ mode: 'closed' });
    this.render();
  }
  
  connectedCallback() {
    if (!store.authToken) {
      return void window.dispatchEvent(
        new CustomEvent("vaadin-router-go", { detail: { pathname: "/" } })
      );
    }
    this.fetchUsers();
  }
  
  fetchUsers() {
    this.context.isLoading = true;
    this.context.error = '';
    fetch('http://localhost:8000/api/users', {
      method: "get",
      headers: {
        "Authorization": store.authToken,
        "Content-type": "application-json"
      }
    }).then(res => res.json()).then(response => {
      this.context.isLoading = false;
      this.context.users = response;
    }).catch(error => {
      console.error(error);
      this.context.error = 'Failed to load users';
      this.context.isLoading = false;
    });
  }

  getTemplate() {
    return html`
      <h1>Users PAGE</h1>
      ${this.context.isLoading ? html`<h1>Loading users...</h1>` : null}
      <ul>
        ${this.context.users?.map(user => html`<li>${user.id} - ${user.firstName}</li>`)}
      </ul>
    `;
  }

  render() {
    render(this.getTemplate(this), this.#showRoot);
  }
}

customElements.define(AppUsers.selector, AppUsers)