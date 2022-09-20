import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList';

function App() {

  const [isVisible, setIsVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data));
  }, []);

  const getUsers = () => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data));
  }

  const selectUser = (user) => {
    // alert(user.email);
    setUserSelected(user);
    setIsVisible(!isVisible);
  }

  const deselectUser = () => setUserSelected(null);

  const getIsVisible = () => {
    if (isVisible) {
      return <UsersForm getUsers={getUsers} setIsVisible={setIsVisible} userSelected={userSelected} deselectUser={deselectUser} setIsConfirm={setIsConfirm} setIsUpdate={setIsUpdate} setUserName={setUserName} />
    }
  }

  const [isConfirm, setIsConfirm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [userName, setUserName] = useState("");

  const confirm = () => {
    if (isConfirm) {
      if (isUpdate) {
        return (
          <div className='confirm green'>
            <i className="fa-solid fa-check"></i>
            <h2>Update User</h2>
            <p>User <b>{userName}</b> has been Update <b>successfully</b></p>
            <button type='button' onClick={() => setIsConfirm(false)}>Accept</button>
          </div>
        )
      } else {
        return (
          <div className='confirm green'>
            <i className="fa-solid fa-check"></i>
            <h2>User Created</h2>
            <p>User created <b>successfully</b></p>
            <button type='button' onClick={() => setIsConfirm(false)}>Accept</button>
          </div>
        )
      }
    }
  }

  const [remove, setRemove] = useState(false);
  const [userNameDeleted, setUserNameDeleted] = useState("");
  const [userDeleteId, setUserDeleteId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const getRemove = (remove, user) => {
    setRemove(remove);
    setUserNameDeleted(`${user.first_name} ${user.last_name}`);
    setUserDeleteId(user.id)
  }

  const wantRemove = () => {
    if (remove) {
      return (
        <div className='confirm'>
          <p>Are you sure you want to delete the user <b>{userNameDeleted}?</b></p>
          <p>If you are sure press the accept button</p>
          <button onClick={() => deleteUser()}>Accept</button>
          <button onClick={() => setRemove(false)}>Cancel</button>
        </div>
      )
    }
  }

  const deleteUser = () => {
    setRemove(false);
    axios.delete(`https://users-crud1.herokuapp.com/users/${userDeleteId}/`)
      .then(() => getUsers())
      .then(() => setIsDeleted(true));
  }

  const getIsDeleted = () => {

    if (isDeleted) {
      return (
        <div className='confirm'>
          <i className="fa-solid fa-check"></i>
          <h2>User Deleted</h2>
          <p>User <b>{userNameDeleted} </b>has been removed <b>successfully.</b></p>
          <button onClick={() => setIsDeleted(false)}>Accept</button>
        </div>
      )
    }
  }

  console.log(users);

  return (
    <div className='App'>
      <div className='nav'>
        <h1>Users</h1>
        <button onClick={() => setIsVisible(!isVisible)}>
          <i className="fa-solid fa-plus"></i>
          Create new user
        </button>
      </div>
      {getIsVisible()}
      <UsersList
        users={users}
        selectUser={selectUser}
        getUsers={getUsers}
        getRemove={getRemove}
        isDeleted={isDeleted}
        userNameDeleted={userNameDeleted}
        userDeletedId={userNameDeleted}
      />
      {confirm()}
      {wantRemove()}
      {getIsDeleted()}
    </div>
  )
}

export default App
