import Card from "./Card.jsx";
import { Context } from "./UglyThingsContext.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadPage from "./LoadPage.jsx";
import Logo from "./Logo.jsx";

/*
TO-DO:
[] ADD ANIMATION TO:
   [x] THE MODAL RENDERING
   [] A CARD DELETING
[x] ADD A SCREEN UNTIL THE FIRST PAGE IS FULLY RENDERED.
[x] ADD RESPONSIVENESS
[x] ADD REAL ICONS FOR MY OPTIONS ICONS


  DOING:
 
    IM BASICALLY FINISHED. I WANT TO ADD A FEW MORE THINGS TO ADD THE CHERRYIES ON THE TOP.

    commit:
    

*/

function App() {

  // STATES
  const url = "https://api.vschool.io/anjaniquem/thing/";
  const [things, setThings] = useContext(Context);
  const [isLoadPageOpen, setIsLoadPageOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
    imgUrl: ""
  });

  // DOCS: this will be updates as the user makes a request, to inform the useEffect function on which if statement to run
  const [requestType, setRequestType] = useState({
    post: false,
    deletereq: false,
    id: null,
    put: false,
    newItem: null
  });

  // FUNCTIONS
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
    setFormInfo({
      title: "",
      description: "",
      imgUrl: ""
    });
    toggleModal();
  }

  function deleteThing(id) {
    const indexOfThing = things.findIndex((elem) => elem._id === id);
    setRequestType(prev => ({
      ...prev,
      deletereq: true,
      id: id
    }));
    setThings(prev => ([...prev].filter((_, index) => index !== indexOfThing)));
  }

  function updateThing(id, updatedItem) {
    setRequestType(prev => ({
      ...prev,
      put: true,
      id: id,
      newItem: updatedItem
    }));
  }



  // modal styling
  function toggleModal() {

    const body = document.getElementsByTagName("body")[0];
    const modal = document.getElementsByClassName("modal")[0];

    if (isModalOpen) {
      body.style.overflowY = "visible";
      setIsModalOpen(prev => !prev);
      modal.classList.replace("show", "hide");

    } else {
      modal.style.display = "block";
      body.style.overflowY = "hidden";
      setIsModalOpen(prev => !prev);
      modal.classList.replace("hide", "show");
    }
  }

  // USE STATE HOOKS

  // DOCS: when a reuest is made (delete a thing, create a new, or edit) this will run, and check which request im making
  useEffect(() => {
    if (requestType.post) {
      axios.post(url, formInfo)
        .then(setRequestType(prev => ({
          ...prev,
          post: false
        })))
        .catch(err => console.log(err));
    }

    if (requestType.deletereq) {
      axios.delete(`${url}${requestType.id}`)
        .then(setRequestType(prev => ({ ...prev, deletereq: false })))
        .catch(err => console.log(err));
    }

    if (requestType.put) {
      axios.put(`${url}${requestType.id}`, requestType.newItem)
        .catch(err => console.log(err));
      setThings(prev => prev.map((thing, index) => thing._id === requestType.id ? { ...prev[index], ...requestType.newItem } : thing));
      setRequestType(prev => ({ ...prev, put: false, id: null }));
    }
  }, [requestType]);

  // takes off load screen
  useEffect(() => {
    const timer = setTimeout(() => { setIsLoadPageOpen(false); }, 3000);
    return () => clearTimeout(timer);
  }, []);


  // DOCS: renders cards
  const cards = things.map(info => <Card {...info} key={info._id} deleteThingFunc={deleteThing} updateThingFunc={updateThing} />);


  return (
    <div className="container">
      {isLoadPageOpen ? <LoadPage /> : null}
      <nav>
        <Logo />
        <button id="openModelBtn" onClick={toggleModal}>Submit new thing.</button>
      </nav>
      <main>
        <h1>Ugly things:</h1>
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
          <span>Loader gif from <a href="https://loading.io/" target="_blank">loading.io</a></span>
        </div>
      </footer>

      {/* MODAL */}
      <div className="modal hide">

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
