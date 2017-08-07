import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../app/containers/App';
import './todoapp.css';

chrome.storage.local.get('state', () => {
  ReactDOM.render(
    <App state={chrome.storage.local} />,
    document.querySelector('#root')
  );
});
