import React from 'react';

export default function Contact(props) {
    const {id, name, email, phone} = props.item
    return (
        <tr style={{'verticalAlign': 'middle'}}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button className="btn btn-secondary btn-sm m-3" onClick={() => props.editContact(props.item)}>EDIT</button>
                <button className="btn btn-secondary btn-sm m-3" onClick={() => props.deleteContact(id)}>DELETE</button>
            </td>
        </tr>
    )
}