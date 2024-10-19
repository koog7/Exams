import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './app/store.ts';
import { Provider } from 'react-redux';
import { addInterceptors } from './axios/AxiosAPI.ts';

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <App />
            </Provider>
        </PersistGate>
    </BrowserRouter>,
)
