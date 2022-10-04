/*

PROJECT:
MAKE A SITE THAT ALLOWS A USER TO POST SOMETHING THAT THEY FIND UGLY, ADD A TITLE, DESCRIPTION, AND AN IMAGE ADDRESS, TO AN API. BE ABLE TO DELETE AND UPDATE THE POST. USER SEES THE UGLY THINSG ON THE DASHBOARD.

NOTES:
- make it halloween themed.
-

*/

function App() {

  return (
    <>
      <nav>
        <span id="title">UglyThingz.</span>
        <button>Submit new thing.</button>
      </nav>
      <main>
        <h1>Ugly things:</h1>
        <section className="cards">
          <div className="card">
            <h2>Title</h2>

            <img src="https://images.unsplash.com/photo-1589358141768-0be9002874f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="fly" />

            <div className="card--description">
              <p>This is a fly and they aren't neccessarily cute.</p>
            </div>
            <div className="card--options">
              <span id="delete-btn"></span>
              <span id="edit-btn"></span>
            </div>
          </div>

          <div className="card">
            <h2>Title</h2>

            <img src="https://images.unsplash.com/photo-1589358141768-0be9002874f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="fly" />

            <div className="card--description">
              <p>This is a fly and they aren't neccessarily cute.</p>
            </div>
            <div className="card--options">
              <span id="delete-btn"></span>
              <span id="edit-btn"></span>
            </div>
          </div>


        </section>
      </main>
    </>
  );
}

export default App;
