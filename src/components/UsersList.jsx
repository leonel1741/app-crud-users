import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const UsersList = ({ users, selectUser, getRemove}) => {

    return (
        <div className='list-container'>
            {
                users.map(user => (
                    <li key={user.id} className='list-item'>
                        <h3><b>{user.first_name} {user.last_name}</b></h3>
                        <div className='information'>
                            <span>Email</span>
                            <b>{user.email}</b>
                        </div>
                        <div className='information border-bottom'>
                            <span>Birthday</span>
                            <b>{user.birthday}</b>
                        </div>
                        <div className='buttons'>
                            <button
                                type='button'
                                onClick={() => getRemove(true, user)}
                            >
                                <i className="fa-regular fa-trash-can red"></i>
                            </button>
                            <button
                                type='button'
                                onClick={() => selectUser(user, true)}
                            >
                                <i className="fa-solid fa-pen edit"></i>
                            </button>
                        </div>
                    </li>
                ))
            }
        </div>
    );
};

export default UsersList;