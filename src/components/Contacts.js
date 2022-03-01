import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Contact from './Contact';
import * as contactAction from '../actions/contactAction';

class Contacts extends Component {

    constructor(props) {
        super(props);
    }

    getContactById = (id) => {
        let contactList = (this.props.contacts) ? this.props.contacts : [];
        return contactList.find((item, index) => index == id)
    }

    editContact = (item) => {
        this.props.onChangeValue({ target: { id: 'selectedContact', value: {...item, edit: true} } });
        this.props.history.push('/contact/contactDetail')
    }

    deleteContact = (id) => {
        this.props.deleteContact(id - 1)
    }

    componentWillUnmount() {
        this.props.onChangeValue({ target: { id: 'searchString', value: null} });
    }

   onSearch = (e) => {
    let filteredContacts = this.props.contacts.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value) || item.email.toLowerCase().includes(e.target.value) || item.phone.toLowerCase().includes(e.target.value)
    });
    this.props.onChangeValue({ target: { id: 'searchString', value: e.target.value } });
    this.props.onChangeValue({ target: { id: 'filteredContacts', value: filteredContacts } });
   }

    render() {
        var  contactList= (this.props.filteredContacts && this.props.searchString) ? this.props.filteredContacts : this.props.contacts
        return ( 
            <div className="p-5">
                <div className="title"><h2>Contact Management</h2></div>
                <div className="row d-flex justify-content-between">
                <input className="col-5" type="text" name="searchName" placeholder="Search Contacts" aria-label="Search" onChange={this.onSearch} value={this.props.searchString} />
                <Link to="/contact/contactDetail" className="btn btn-primary btn-sm col-2">
                    Add Contact
                </Link>
                </div>
                <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     {(contactList &&  contactList.length > 0) && contactList.map((item, index) => (
                          <Contact key={index} item = {{...item}} editContact={this.editContact} deleteContact = {this.deleteContact} />
                        )  
                     )}  
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired
};
 
const mapStateToProps = (state) => {
    let contactsState = state.contactsState;
    return {
        contacts: contactsState.contacts,
        filteredContacts: contactsState.filteredContacts,
        searchString: contactsState.searchString
    }
}

export function mapDispatchToProps(dispatch) {
	return {
        onChangeValue: (evt) => dispatch(contactAction.onChangeValue(evt)),
        deleteContact: (id) => dispatch(contactAction.deleteContact(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));