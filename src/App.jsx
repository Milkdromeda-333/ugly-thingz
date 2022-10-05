import Card from "./Card.jsx";
import { Context } from "./UglyThingsContext.jsx";
import { useContext, useEffect, useState } from "react";
import { post, axios } from "axios";

/*

PROJECT:
MAKE A SITE THAT ALLOWS A USER TO POST SOMETHING THAT THEY FIND UGLY, ADD A TITLE, DESCRIPTION, AND AN IMAGE ADDRESS, TO AN API. BE ABLE TO DELETE AND UPDATE THE POST. USER SEES THE UGLY THINSG ON THE DASHBOARD.

NOTES:
- make it halloween themed.
-

TO-DO:
[x] make a component that makes cards
[x] make context that passes state of the ugly things and its info
[]make a way to post thingz
[] make a way to delete things
[] make a way to edit things


  DOING:
  be able to post new thing
  

  !!!!! 
  axios delete requiest isnt working.
  post isnt working
*/

function App() {

  const url = "https://api.vschool.io/anjaniquem/thing";
  const [things, setThings] = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
    imgUrl: ""
  });
  const [requestType, setRequestType] = useState({
    get: false,
    post: false,
    deletereq: false,
    id: null,
    put: false
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setThings(prev => [...prev, formInfo]);
    setRequestType(prev => ({
      ...prev,
      post: true
    }));
  }

  function deleteThing(id) {
    const indexOfThing = things.findIndex((elem) => elem._id === id);

    setRequestType(prev => ({
      ...prev,
      deletereq: true,
      id: id
    }));

    setThings(prev => ([...prev].filter((_, index) => index !== indexOfThing)));

    console.log(`${url}${id}`);

  }

  useEffect(() => {

    // this posts a new thing onSubmit in the form IF the from title has value
    if (requestType.post === true) {
      post(url, formInfo)
        .then(setRequestType(prev => ({
          ...prev,
          post: false
        })))
        .catch(err => console.log(err.response.data.error));
      console.log("made get request");
    }

    if (requestType.deletereq) {
      axios.delete(`${url}${requestType.id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }, [requestType]);

  // modal styling

  function toggleModal() {
    const body = document.getElementsByTagName("body")[0];
    const modal = document.getElementsByClassName("modal")[0];

    if (isModalOpen) {
      modal.style.display = "none";
      body.style.overflowY = "visible";
      setIsModalOpen(prev => !prev);

    } else {
      modal.style.display = "block";
      body.style.overflowY = "hidden";
      setIsModalOpen(prev => !prev);
    }


  }
  // renders cards
  const cards = things.map(info => <Card {...info} key={info._id} deleteThingFunc={deleteThing} />);


  return (
    <div className="container">
      <nav>
        <span id="title">UglyThingz.</span>
        <button id="openModelBtn" onClick={toggleModal}>Submit new thing.</button>
      </nav>
      <main>
        <h1>Ugly things:</h1>
        {/* empty div to hold the space for the grid title */}
        <div></div>
        <section className="cards">
          {cards}
        </section>
      </main>
      {/* FOOTER */}
      <footer>
        <img src="src/assets/icons8-cat-52.png" alt="" />
        <div>
          <span>Delete icon by <a target="_blank" href="https://icons8.com">Icons8</a></span>
          <span>Edit icon by <a target="_blank" href="https://icons8.com">Icons8</a></span>
        </div>
      </footer>

      {/* MODAL */}
      <div className="modal">

        <div className="modal--header">
          <h2>Post something <span id="post-something-ugly--decor">UGLY</span>
          </h2>
          <span className="close" onClick={toggleModal}>&times;</span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <label htmlFor="thing-title">
            Title: <br />
            <input type="text" required name="title" id="thing-title" placeholder="whats the hideous thing?" onChange={handleChange} value={formInfo.title} />
          </label>

          <label htmlFor="imgUrl">
            Image Url: <br />
            <input type="text" required name="imgUrl" id="imgUrl" placeholder="EEK..show us..." onChange={handleChange} value={formInfo.imgUrl} />
          </label>

          <label htmlFor="description">
            Descripion: <br />
            <textarea required name="description" id="description" placeholder="GAHH, explain this!.." onChange={handleChange} value={formInfo.description} />
          </label>

          <button>Submit</button>

        </form>
      </div >

    </div >
  );
}

export default App;
