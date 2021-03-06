import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';
import RouterComponent from './router';

import './styles/global.css';

const contentElement = document.getElementById("content");

ReactDOM.render(
	<ReactRouterDOM.BrowserRouter>
		<RouterComponent />
	</ReactRouterDOM.BrowserRouter>,
	contentElement
);