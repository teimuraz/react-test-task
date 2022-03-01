import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import * as contactAction from './actions/contactAction';
import Contacts from './components/Contacts';
import ContactDetail from './components/ContactDetail';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: []
    }
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.name);
  }

  render() {
    return(
        <Router>
        <div className="App">
          <div className="container">

            <Switch>
              <Route exact path="/" component={Contacts} />
              <Route exact path="/contact/contactDetail" component={ContactDetail} />
            </Switch>
          </div>
        </div>
        </Router>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
