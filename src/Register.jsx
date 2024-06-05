import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function Register({ setShowRegister}) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleRegister = async (e) => {
    e.preventDefault()
    const bodyObj = {
      username: username,
      password: password
    }
    axios.post('/api/register', bodyObj)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: "USER_AUTH",
          payload: res.data.userId
        })
        setShowRegister(false)
        setUsername("")
        setPassword("")
      }

      alert(res.data.message)
    })
  }

  return (
    <div id='register'>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>

        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default Register