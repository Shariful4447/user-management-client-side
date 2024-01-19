
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUser] = useState();

  useEffect(()=>{
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  const handleAdduser = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    
    const user = {name}
    console.log(user);
    fetch('http://localhost:3000/users',{
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data =>{
      const newUsers = [...users, data]
      setUser(newUsers);
      form.reset();
    })
  }

  return (
    <>

      <h1>Vite + React</h1>
      <p>User management : {users?.length} </p>

    <form onSubmit={handleAdduser}>
        <input className='border' type="text" name="name" id="" />
        <input type='submit' value='Add user'/>
    </form>

      <div>
          {
            users?.map(user =><p key={user.id}>{user.id} : {user.name}</p>)
          }
      </div>

    </>
  )
}

export default App
