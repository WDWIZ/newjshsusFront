import { NavLink, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

import QueryString from 'qs';

import "../assets/styles/print.scss";

const SERVER = import.meta.env.VITE_BACKEND_SERVER;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getData(url, params = {}){
    const response = await axios.get(`${url}`, {
        params: params
    });

    return response.data;
}

function decodeHTMLEntities (str) {
    if(str !== undefined && str !== null && str !== '') {
        str = String(str);

        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        var element = document.createElement('div');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
    }

    return str;
}

function Print(){
    const floors = [2, 3, 4];
    const [ floor, setFloor ] = useState(1);

    useEffect(() => {
        const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
        
        if (queryData.f == null){
            console.log("Error: Floor ID cannot be null");
            return;
        }

        setFloor(queryData.f);

        init(queryData.f);
    }, []);

    function init(floor){
        console.log(floor);
    }

    return(
        <>
        <div id="print">
            {floors.map((x, idx) => <NavLink key={idx} to={`/print?f=${x}`} className={`menu-choice ${x == floor ? "now-choice" : ""}`}>{x}층</NavLink>)}
            <table className={`tg${floor}`}>
                <thead>
                    <tr>
                        <th class="tg-62by" colspan="5"><span>탐활서 명단 ({floor}층)</span></th>
                    </tr>
                </thead>
            </table>
        </div>
        </>
    )
}

export default Print;