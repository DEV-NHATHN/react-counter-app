import './App.css';
import Movies from './components/Movies.jsx';
import Counters from './components/Counters.jsx';
import NavBar from './components/NavBar.jsx';

function App() {

   return (
      <>
         <main className="container">
            <NavBar totalCounters={10} />
            <header className="App-header">
               {/* <Counters /> */}
               <Movies />
            </header>
         </main>
      </>
   );
}

export default App;
