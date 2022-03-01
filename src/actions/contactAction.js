import * as actionType from './actionType';

export const createContact = (contact) => {
    return {
        type: actionType.CREATE_NEW_CONTACT,
        payload: contact
    }
} 

export const deleteContact = (id) => {
    return {
        type: actionType.DELETE_CONTACT,
        id: id
    }
}

export const editContact = (contact) => {
    return {
        type: actionType.EDIT_CONTACT,
        payload: contact
    }
}

export function onChangeValue(evt) {
	return {
    type: actionType.CONTACT_INPUT_VALUE_CHANGED,
    id: (!evt.target.id) ? evt.target.name : evt.target.id,
    value: evt.target.value,
	};
}