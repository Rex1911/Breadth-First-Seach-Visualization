import p5 from 'p5/lib/p5.min';
import s, {startSearch,clearWalls,clearPath, createMazeHelper} from './app/sketch';

document.querySelector("#start").onclick = startSearch;
document.querySelector("#clearWalls").onclick = clearWalls;
document.querySelector("#clearPath").onclick = clearPath;
document.querySelector("#createMaze").onclick = createMazeHelper;

new p5(s)