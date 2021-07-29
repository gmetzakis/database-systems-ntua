import React from 'react';
import './App.css';
import welcome from './components/welcome';
import welcomePage from './components/welcome_page';
import Visits from './components/Visits';
import visitsResults from './components/visitsResults';
import covid from './components/covid-19';
import exposed_areas from './components/find_exposed_areas';
import most_used from './components/most_used';
import mostUsedAreas from './components/mostUsedAreas';
import mostFreqServ from './components/mostFreqServ';
import mostUsedServ from './components/mostUsedServ';
import suspects from './components/covid_suspects';
import find_suspects from './components/find_covid_suspects';
import RoomsInfo from './components/roomsInfo';
import Customers from './components/CustomersInfo';
import NFCInfo from './components/nfcInfo';
import ServiceInfo from './components/ServiceInfo';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {

  return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={welcomePage}/>
            <Route path='/moreInfo/' exact={true} component={welcome}/>
            <Route path='/ServicesInfo/' exact={true} component={ServiceInfo}/>
            <Route path='/costumers/' exact={true} component={Customers}/>
            <Route path='/covid/' exact={true} component={covid}/>
            <Route path='/rooms/' exact={true} component={RoomsInfo}/>
            <Route path='/NFCinfo/:id' exact={true} component={NFCInfo}/>
            <Route path='/visits/' exact={true} component={Visits}/>
              <Route path='/find_exposed_areas/:id' exact={true} component={exposed_areas}/>
              <Route path='/most_used/' exact={true} component={most_used}/>
            <Route path='/mostUsedAreas/' exact={true} component={mostUsedAreas}/>
            <Route path='/mostFreqServ/' exact={true} component={mostFreqServ}/>
            <Route path='/mostUsedServ/' exact={true} component={mostUsedServ}/>
            <Route path='/suspects/' exact={true} component={suspects}/>
            <Route path='/find_covid_suspects/:id' exact={true} component={find_suspects}/>
            <Route path='/visitsResults/:service/:cost/:dateFrom/:dateTo' exact={true} component={visitsResults}/>
          </Switch>
        </Router>
  );
}

export default App;
