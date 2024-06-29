import Home from './home';
import View from "./view";
import Print from "./print";
import NotFound from './404';

const pages = [
    { "id" : "home", "path" : "/", "subtitle" : "", "comp" : Home },
    { id: "view", path: "/view", subtitle: "탐활 조회", comp: View },
    { id: "print", path: "/print", subtitle: "탐활서 출력", comp: Print },
    { "id" : "404", "path" : "*", "subtitle" : "404", "comp" : NotFound },
];

export default pages;