import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({ getUsers, setIsVisible, userSelected, deselectUser, setIsConfirm, setIsUpdate, setUserName }) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {

        if (userSelected) {
            reset(userSelected);
        }

    }, [userSelected]);

    const submit = (data) => {
        if (userSelected) {
            setUserName(`${userSelected.first_name} ${userSelected.last_name}`);
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                .then(() => getUsers())
                .then(() => setIsUpdate(true))
                // .then( () => setIsVisible(false) )
                .catch(error => console.log(error.response));

        } else {
            setIsUpdate(false);
            axios.post('https://users-crud1.herokuapp.com/users/', data)
                .then(() => getUsers())
                // .then(() => setIsVisible(false))
                .catch(error => console.log(error.response));
        }
        setIsConfirm(true);
        clear();
    }

    const clear = () => {
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: ""
        });
        deselectUser();
        setIsVisible(false);
    }

    return (
            <form className='user-form' onSubmit={handleSubmit(submit)}  >
                <button
                    type='button'
                    onClick={() => clear()}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h1>{userSelected ? 'Update User' : 'Create user'}</h1>
                <div className='input-container'>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id='first-name'
                        required
                        {...register('first_name')}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id='last-name'
                        required
                        {...register('last_name')}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id='email'
                        required
                        placeholder='example@mail.com'
                        {...register('email')}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        required
                        {...register('password')}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="birthday">Birthday</label>
                    <input
                        type="date"
                        id='birthday'
                        required
                        {...register('birthday')}
                    />
                </div>
                <button className='button-create-update'
                >{userSelected ? "Update User" : "Create user"}</button>              
            </form>
    );
};

export default UsersForm;