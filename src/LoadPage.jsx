import Logo from "./Logo.jsx";

export default function LoadPage() {

    return (
        <div className="load-page">

            <div className="loadPage--container">
                <h2>Beware of</h2>
                <Logo />
                <img src="./Pulse-1s-200px.gif" alt="loading gif" />
            </div>

        </div>
    );
}