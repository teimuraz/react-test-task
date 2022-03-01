import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as contactAction from '../actions/contactAction';

class ContactDetail extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      name: '',
      email: '',
      phone: '',
      errors: {},
      edit: false,
      id: 0
    };
  }

  
  componentDidMount() {
    if (this.props.selectedContact) {
      this.setState({...this.props.selectedContact})
    }
  }

  componentWillUnmount() {
    this.props.onChangeValue({ target: { id: 'selectedContact', value: null } });
  }

  onSubmit = e => {
    e.preventDefault()
    const { name, email, phone, id } = this.state;

    // Check for Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    let emailValidationRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)

    if (!emailValidationRegex) {
      this.setState({ errors: { email: 'Please enter valid email' } });
      return;
    }
    let phomeValidationRegx = new RegExp(/^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/).test(phone)
    if (!phomeValidationRegx) {
      this.setState({ errors: { phone: 'Please enter valid phone number' } });
      return;
    }
    
    const contactDetail = {
      name,
      email,
      phone,
      id
    };

    if (!this.state.edit) {
      let contactsId = (this.props.contacts && this.props.contacts.length > 0) ? Math.max(...this.props.contacts.map((item) => item.id)) + 1 : 1
      this.props.createContact({...contactDetail, id:contactsId});
    } else {
      this.props.editContact(contactDetail);
    }

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  }

  cancel = (e) => {
    e.preventDefault()
    this.props.history.push('/');
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors, edit } = this.state;
    return (
      <div className="row">
          <h3>{(edit) ? 'Edit' : 'Add'} Contact</h3>
          <div className="card-body">
            <form>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10 has-validation">
                <input 
                  name='name'
                  className="form-control" 
                  type="text" 
                  value={name}
                  onChange={this.onChange}
                />
                {(errors && errors.name) && <div className="form-error">
                  {errors.name}
                </div>}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input 
                  name='email'
                  className="form-control" type="text" 
                  value={email}
                  onChange={this.onChange}
                />
                {(errors && errors.email) && <div className="form-error">
                  {errors.email}
                </div>}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Phonenumber</label>
              <div className="col-sm-10">
                <input
                  name='phone'
                  className="form-control" 
                  type="text" 
                  value={phone}
                  onChange={this.onChange}
                />
                 {(errors && errors.phone) && <div className="form-error">
                  {errors.phone}
                </div>}
              </div>
            </div>
              <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Save</button> &nbsp;
              <button className="btn btn-primary" onClick={(e) => this.cancel(e)}>Cancel</button>
            </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("state dd", state);
  let contactsState = state.contactsState;
  return {
    contacts: contactsState.contacts,
    selectedContact: contactsState.selectedContact
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    onChangeValue: (evt) => dispatch(contactAction.onChangeValue(evt)),
    editContact: contact => dispatch(contactAction.editContact(contact)),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactDetail));


