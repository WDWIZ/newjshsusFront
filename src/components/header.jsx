import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import "../assets/styles/header.scss";

function Header({ subtitle }){

    return(
        <>
            <header className="header" id="header">
                <div className="left_wrap">
                    <Link to="/"><img id="logo" src="icon.png" /></Link>
                    <Link id="header_title" className="title" to="/">{import.meta.env.VITE_TITLE}</Link>
                    <Link to="/" id="header_subtitle" className="title subtitle">
                        <span id="header_subtitle_content">{subtitle ? "\u00A0: " + subtitle : ""}</span>
                    </Link>
                </div>

                <div className="right_wrap">
                    <div id="menu_icon">
                        <span className="menu_icons"></span>
                        <span className="menu_icons"></span>
                        <span className="menu_icons"></span>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;