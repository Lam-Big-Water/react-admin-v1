import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import App from './App';


// 全局用react-redux的Provider全局提供store状态
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
