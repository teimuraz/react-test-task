import * as actionType from '../actions/actionType';

let contactsList = localStorage.getItem("contacts");
const initialstate = {
    contacts: contactsList ? JSON.parse(contactsList) : []
}
console.log("Initial State::", initialstate)

export default function contacts(state = initialstate, action) {
    switch (action.type) {
      
        case actionType.CREATE_NEW_CONTACT:
            let contacts = (state.contacts) ? state.contacts : [];
            let savedContacts = [
                ...contacts,
                Object.assign({}, action.payload)
            ]
            localStorage.setItem('contacts', JSON.stringify(savedContacts))
            return {...state, 
                contacts: savedContacts
            };

        case actionType.DELETE_CONTACT:
            console.log('action', action.id)
             let filteredContacts = state.contacts.filter((data, i) => data.id !== action.id);
             console.log("Filte", filteredContacts)
             localStorage.setItem('contacts', JSON.stringify(filteredContacts))
             return {...state, 
                contacts: filteredContacts
            };

        case actionType.CONTACT_INPUT_VALUE_CHANGED:
            return {...state, 
                [action.id]: action.value
            };

        case actionType.EDIT_CONTACT:
            for (let i = 0; i < state.contacts.length; i++) {
                if (action.payload.id == state.contacts[i].id) {
                    state.contacts[i] = action.payload
                }
            }
            localStorage.setItem('contacts', JSON.stringify(state.contacts))
            return {...state, 
                contacts: state.contacts
            };
            
        default:
              return state;
    }
}