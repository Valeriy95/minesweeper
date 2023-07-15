import './index.css';
import start from './modules/functionStart';

const level = localStorage.getItem('changeLevel');
if (level === 'medium') {
  start(15, 15, 15);
} else if (level === 'heavy') {
  start(25, 25, 25);
} else {
  start(10, 10, 10);
}

document.body.oncontextmenu = function (e) {
  return false;
};
