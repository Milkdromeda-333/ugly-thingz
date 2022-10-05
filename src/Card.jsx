export default function Card({ title, description, imgUrl, _id, deleteThingFunc }) {
    return (
        <div className="card">
            <h2>{title}</h2>

            <div className="card--img-container">
                <img src={imgUrl} alt="#" />
            </div>

            <div className="card--description">
                <p>{description}</p>
            </div>
            <div className="card--options">
                <span id="delete-btn" onClick={() => deleteThingFunc(_id)}></span>
                <span id="edit-btn"></span>
            </div>

        </div>
    );
}