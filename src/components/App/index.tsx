import React from 'react';
import { hot } from 'react-hot-loader/root';
import './style.scss';

export const App = hot(_App)
export function _App({ title = 'App!' }): JSX.Element | null {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}