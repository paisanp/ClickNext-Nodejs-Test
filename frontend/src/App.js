import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Pages/Login';
import Homepage from './Pages/Home';
import Deposit from './Pages/Deposit';
import Withdraw from './Pages/Withdraw';
import Transfer from './Pages/Transfer';
import Transferhistory from './Pages/Transferhistory';
import Receivehistory from './Pages/Receivehistory';
import PageNotFound from './Pages/PageNotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage /> }/>
          <Route path="/login" exact element={<Login />}/>
          <Route path="/deposit" exact element={<Deposit />}/>
          <Route path="/withdraw" exact element={<Withdraw />}/>
          <Route path="/transfer" exact element={<Transfer />}/>
          <Route path="/transferhistory" exact element={<Transferhistory />}/>
          <Route path="/receivehistory" exact element={<Receivehistory />}/>
          <Route path="*" exact element={<PageNotFound />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
