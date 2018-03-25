import React, {Component} from 'react'
import './style.css'

function login(username, password) {
  alert(`attempting to login as ${username}`)
}

export default class LoginCard extends Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {
    return (
      <div id="login-card">
        <h2 class="title">Login</h2>
        <form id="login-form" onSubmit={this.onSubmit}>
          <div class="element">
            <label>Username</label>
            <input type="text" name="username" placeholder="username" onChange={this.onChange}/>
          </div>
          <div class="element">
            <label>Password</label>
            <input type="password" name="password" placeholder="password" onChange={this.onChange}/>
          </div>
          <div class="buttons">
            <input type="submit" value="login"/>
          </div>
        </form>
      </div>
    )
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (!this.state.username || !this.state.password) {
      alert("All fields must be filled to login")
    }
    login(this.state.username, this.state.password)
  }

  onChange = (event) => {
    if (event.target.name == "username") {
      this.setState({username: event.target.value})
    } else if (event.target.name == "password") {
      this.setState({password: event.target.value})
    }
  }
}
