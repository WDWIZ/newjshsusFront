import { useState, useEffect } from 'react';

import axios from "axios";

import "../assets/styles/view.scss";

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

function workTimes(n){
    n = Number(n);
    switch(n){
        case 1:
            return "9:00 ~ 10:40";
        case 2:
            return "11:00 ~ 12:00";
        case 3:
            return "14:00 ~ 15:40";
        case 4:
            return "16:00 ~ 18:00";
        case 5:
            return "19:10 ~ 20:20";
        case 6:
            return "20:30 ~ 21:30";
        case 7:
            return "21:50 ~ 23:30";
    }
}

function workTimeCh(str){
    let matches = str.match(/\d+/g);
    let arr = matches ? matches.map(Number).sort((a, b) => a - b) : [];
    let arr2 = arr ? arr.map((x, idx) => {return workTimes(x)}) : [];

    return arr2 ? arr2.join(', '): "";
}


const $tamhwal = ({data}) => {
    data.worktheme = decodeHTMLEntities(data.worktheme);
    data.workplace = decodeHTMLEntities(data.workplace);

    if (data.display == 'n') return;

    return(
        <>
            <div className="tamhwal">
                <table>
                    <tbody>
                        <tr>
                            <th>탐활 일시</th>
                            <td>{data.workdate}</td>
                        </tr>
                        <tr>
                            <th>활동 장소</th>
                            <td>{data.workplace}</td>
                        </tr>
                        <tr>
                            <th>활동 내용</th>
                            <td>{data.worktheme}</td>
                        </tr>
                        <tr>
                            <th>활동 시간</th>
                            <td>{workTimeCh(data.studytime)}</td>
                        </tr>
                        <tr>
                            <th>지도 교사</th>
                            <td>{data.teacher}</td>
                        </tr>
                        <tr>
                            <th>대표 학생</th>
                            <td>{data.firststudent}</td>
                        </tr>
                        <tr>
                            <th>참가 학생</th>
                            <td>{data.joinstudent}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

function View(){
    const [ tamhwalInfo, setTamhwalInfo ] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init(){
        const tData = await getData(`${SERVER}/today`);
        if (tData) setTamhwalInfo(tData);
    }

    return(
        <>
        <div id="view">
            <div className="wrap">
                {
                    tamhwalInfo == [] ?
                    "" :
                    tamhwalInfo.map((x, idx) => <$tamhwal id={idx} key={idx} data={x} />)
                }
            </div>
        </div>
        </>
    )
}

export default View;