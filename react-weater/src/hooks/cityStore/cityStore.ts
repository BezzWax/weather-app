import { createStore } from 'redux';
import { cityReduser } from './cityRedusers';

export const cityStore = createStore(cityReduser);