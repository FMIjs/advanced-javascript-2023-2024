import './test.css';
import icon from "./webpack-icon.svg";

export const test = 123;

const div = document.createElement('div');
const img = document.createElement('img');
img.src = icon;

div.id = 'test';
div.innerHTML = 'HELLO WORLD';
document.body.appendChild(div);
document.body.appendChild(img);
