import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import { ready } from './lib/telegram';

ready();

export default mount(App, { target: document.getElementById('app')! });
