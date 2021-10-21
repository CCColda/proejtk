import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StageComponent from './stage';
import * as ReactRouterDOM from 'react-router-dom';
import StageSelectorComponentRoute from './stageselector';
import StageComponentRoute from './stage';
import RouterComponent from './router';

const contentElement = document.getElementById("content");

ReactDOM.render(
	<ReactRouterDOM.BrowserRouter>
		<RouterComponent />
	</ReactRouterDOM.BrowserRouter>,
	contentElement
);