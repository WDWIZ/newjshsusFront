import {NavLink} from "react-router-dom";

import "../assets/styles/home.scss";

function Home(){
    function urlGoTo(url){
        NavLink(url);
    }

    return(
        <>
        <div id="home">
            <NavLink to="/view" id="toView">탐활서 조회하기</NavLink>

            <h1 id="message">Quis hoc fecit? Noli mirari, noli quaerere.</h1>
        </div>
        </>
    )
}

export default Home;