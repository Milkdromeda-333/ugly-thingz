import { useState } from "react";

export default function Card({ title, description, imgUrl, _id, deleteThingFunc, updateThingFunc }) {

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [inputs, setInputs] = useState({
        title: title,
        description: description
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }
        ));
    }

    function handleSubmit() {
        updateThingFunc(_id, inputs);
        setIsEditOpen(false);
    }

    return (
        <div className="card">
            <h2>{isEditOpen ? <input name="title" value={inputs.title} onChange={handleChange} /> : title}</h2>

            <div className="card--img-container">
                <img src={imgUrl} alt="#" />
            </div>

            <div className="card--description">
                {isEditOpen ? <input name="description" value={inputs.description} onChange={handleChange} /> : <p>{description}</p>}
            </div>
            <div className="card--options">
                <span id="delete-btn" onClick={() => deleteThingFunc(_id)}>
                    <i className="bi bi-trash fa-5x"></i>
                </span>
                <span id="edit-btn" onClick={() => setIsEditOpen(prev => !prev)}>
                    <i className="bi bi-pencil-square"></i>
                </span>
                {isEditOpen ? <span onClick={handleSubmit} id="submit-edit-btn">save</span> : null}
                {isEditOpen ? <span onClick={() => setIsEditOpen(false)} id="exit-edit-btn">exit</span> : null}
            </div>

        </div>
    );
}