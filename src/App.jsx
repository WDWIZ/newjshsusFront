import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import pages from './pages';
import Header from "./components/header";

function App(){
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const title = import.meta.env.VITE_TITLE;
    const [ subtitle, setSubtitle ] = useState("");
    const [ pageID, setpageID ] = useState("");

    useEffect(() => {
        const { "subtitle" : newSubtitle } = pages.find(p => p.path === pathname) || pages.find(p => p.path === "*");
        const { "id" : newID } = pages.find(p => p.path === pathname) || pages.find(p => p.path === "*");
        setSubtitle(newSubtitle);
        setpageID((newID == "home") ? "" : newID);

        document.title = title + ' : ' + newSubtitle;
    }, [pathname] );

    return(
        <>
            <Header subtitle={subtitle} />
            <Routes>
                { pages.map(p => <Route key={p.id} path={p.path} element={<p.comp />}/>) }
            </Routes>
        </>
    )
}

export default App;