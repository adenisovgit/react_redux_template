import '../assets/application.scss';

import run from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

run();
