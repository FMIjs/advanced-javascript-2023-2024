import { Router } from "@vaadin/router";
import { AppHome } from './home';
import { AppLogin } from "./login";
import { AppUsers } from './users';

const router = new Router(document.getElementById('outlet'));

router.setRoutes([
  { path: '/', component: AppHome.selector },
  { path: '/login', component: AppLogin.selector },
  { path: '/users', component: AppUsers.selector }
]);