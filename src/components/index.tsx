import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

const contentElement = document.getElementById("content");

ReactDOM.render(
	<App stagefile={contentElement.dataset.stagefile ?? ""} />,
	contentElement
);