import React from 'react'
// import { login } from './actions'

const Login = () => {
  // 既にログイン状態の場合はトップページにリダイレクトしたい
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button>Sign in</button>
      {/* <button formAction={login}>Log in</button> */}
    </form>
  )
}

export default Login