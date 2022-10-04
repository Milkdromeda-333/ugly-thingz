import Card from "./Card.jsx";
import { Context } from "./UglyThingsContext.jsx";
import { useContext, useState } from "react";

/*

PROJECT:
MAKE A SITE THAT ALLOWS A USER TO POST SOMETHING THAT THEY FIND UGLY, ADD A TITLE, DESCRIPTION, AND AN IMAGE ADDRESS, TO AN API. BE ABLE TO DELETE AND UPDATE THE POST. USER SEES THE UGLY THINSG ON THE DASHBOARD.

NOTES:
- make it halloween themed.
-

TO-DO:
[] make a component that makes cards
[] make context that passes state of the ugly things and its info
[]make a way to post thingz
[] make a way to delete things
[] make a way to edit things


  DOING:
  be able to post new thing
*/

function App() {
  const [things, setThings] = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // modal styling
  const modal = document.getElementsByClassName("modal")[0];

  function toggleModal() {

    if (isModalOpen) {
      modal.style.display = "none";
      setIsModalOpen(prev => !prev);
    } else {
      modal.style.display = "block";
      setIsModalOpen(prev => !prev);
    }


  }


  // renders cards
  const cards = things.map(info => <Card {...info} key={info._id} />);
  return (
    <div className="container">
      <nav>
        <span id="title">UglyThingz.</span>
        <button id="openModelBtn" onClick={toggleModal}>Submit new thing.</button>
      </nav>
      <main>
        <h1>Ugly things:</h1>
        <section className="cards">
          {cards}
        </section>
      </main>

      {/* MODAL */}
      <div className="modal">

        <div className="modal--header">
          <h2>Post something <span id="post-something-ugly--decor">UGLY</span>
          </h2>
          <span class="close" onClick={toggleModal}>&times;</span>
        </div>

        {/* FORM */}
        <form>

          <label htmlFor="thing-title">
            Title: <br />
            <input type="text" required name="title" id="thing-title" placeholder="whats the hideous thing?" />
          </label>

          <label htmlFor="imgUrl">
            Image Url: <br />
            <input type="text" required name="imgUrl" id="imgUrl" placeholder="EEK..show us..." />
          </label>

          <label htmlFor="description">
            Descripion: <br />
            <textarea required name="description" id="description" placeholder="GAHH, explain this!.." />
          </label>

          <button>Submit</button>

        </form>
      </div >
    </div >
  );
}

export default App;
