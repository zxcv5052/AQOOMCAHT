import React from 'react';
import ReactDOM from 'react-dom';
import Logged from './client/Logged';
import UnLogged from './client/UnLogged'
const flag = true;
// 여기서 나누면 될 듯?
if(flag) ReactDOM.render( <Logged /> ,document.getElementById('root'));

else ReactDOM.render( <UnLogged /> ,document.getElementById('root'));

