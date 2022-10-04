export default function Card({ title, description, imgUrl, _id }) {
    return (
        <div className="card">
            <h2>{title}</h2>

            <img src={imgUrl} alt="#" />

            <div className="card--description">
                <p>{description}</p>
            </div>
            <div className="card--options">
                <span id="delete-btn"></span>
                <span id="edit-btn"></span>
            </div>

        </div>
    );
}