import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store'
import {Provider} from 'react-redux'
import AppRouter from './router'
import "antd/dist/antd.css";
import './style.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
