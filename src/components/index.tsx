import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StageComponent from './stage';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import StageSelectorComponentRoute from './stageselector';
import StageComponentRoute from './stage';
import RouterComponent from './router';

const contentElement = document.getElementById("content");

ReactDOM.render(
	<BrowserRouter>
		<RouterComponent />
	</BrowserRouter>,
	contentElement
);