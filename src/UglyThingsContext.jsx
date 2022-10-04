import { createContext, useEffect, useState } from "react";
import { get } from "axios";

const Context = createContext(null);

function UglyThingsContext(props) {
    const [things, setThings] = useState([]);

    useEffect(() => {
        get(`https://api.vschool.io/anjaniquem/thing`)
            .then(res => setThings(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Context.Provider value={[things, setThings]}>
            {props.children}
        </Context.Provider>
    );
}

export { Context, UglyThingsContext };