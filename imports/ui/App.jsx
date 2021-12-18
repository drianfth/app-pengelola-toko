import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { BarangCollection } from '/imports/api/BarangCollection';
import { Form } from "./Form";
import { Data } from "./Data";
import { EditData } from './EditData';
import { Kalkulator } from './Kalkulator';
import "bulma/css/bulma.min.css";
// import logo from './shop.png';

export const App = () => {


  return (
    <div>
      <section className='hero is-fullheight'>
        <div className='columns is-justify-content-center '>

          <div className="box column is-11 mt-3">
            {/* <img src={logo} alt="" /> */}
            <h3 className='is-size-3 has-text-centered has-text-weight-bold'>Kelola Barangmu</h3>



            <Router>
              <Switch>
                <Route exact path="/">
                  <Data />
                </Route>
                <Route path="/add">
                  <Form />
                </Route>
                <Route path="/edit/:_id">
                  <EditData />
                </Route>
                <Route path="/kalkulator">
                  <Kalkulator />
                </Route>

              </Switch>
            </Router>





          </div>

        </div>
      </section>
    </div>
  );
};
