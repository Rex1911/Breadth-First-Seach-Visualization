import p5 from 'p5/lib/p5.min';
import s, {startSearch} from './app/sketch';

document.querySelector("#start").onclick = startSearch;

new p5(s)