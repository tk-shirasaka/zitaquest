import React from 'react';
import ReactDOM from 'react-dom';

import { AppComponent } from './components/App';

if (document.getElementById('example')) {
    ReactDOM.render(<AppComponent />, document.getElementById('example'));
}
