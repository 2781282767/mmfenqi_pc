/**
 * Created by ChinaHp on 2016/8/11.
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router,hashHistory} from 'react-router';

import routes from './Route'; //路由配置

import './less/style.less'
import  'flex.css'
import './auto-set-rem'

render(<Router routes={routes} history={hashHistory} />
    ,document.getElementById('content'));