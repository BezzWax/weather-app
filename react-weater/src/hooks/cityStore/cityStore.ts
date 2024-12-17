import { configureStore } from '@reduxjs/toolkit';
import { cityReduser } from './cityRedusers';

export const cityStore = configureStore({
    reducer: {
        city: cityReduser,
    },
});

export type RootState = ReturnType<typeof cityStore.getState>;
export type AppDispatch = typeof cityStore.dispatch;
