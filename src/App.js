//import Router details. 
//Note to self: using updated router package v6 not v5
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Header from './components/Header'
import MainPage from './pages/MainPage'
import NotePage from "./pages/NotePage";

//routing path to home page ex: "/"
//As well as other pages 
function App() {
  return (
    <div>
      <Router>
        <div className="container light">
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" exact element={<MainPage />} />
              <Route path="/note/:id" element={<NotePage />} />
            </Routes>
          </div>
        </div>
        </Router>
    </div>
    
  );
}

export default App;
