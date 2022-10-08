import { createContext, useEffect, useState } from "react";
import { get } from "axios";

const Context = createContext(null);

function UglyThingsContext(props) {
    const [things, setThings] = useState([
        {
            title: "Yoda",
            description: "stinky green",
            imgUrl: "https://images.unsplash.com/photo-1607542479648-d3cd5d518b65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
            _id: "123456789"
        }
    ]);

    useEffect(() => {
        get(`https://api.vschool.io/anjaniquem/thing`)
            .then(res => setThings(prev => [...prev, ...res.data]))
            .catch(err => console.log(err));
    }, []);

    return (
        <Context.Provider value={[things, setThings]}>
            {props.children}
        </Context.Provider>
    );
}

export { Context, UglyThingsContext };