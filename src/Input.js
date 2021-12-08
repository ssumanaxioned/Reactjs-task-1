import React, { Component } from 'react'

class Input extends Component {
  render() {
    return (
      <form className="input-ctn" onSubmit={this.props.addToList}>
        <button type="button" onClick={this.props.allCompleted}>Change</button>
        <input id="items" value={this.props.item} onChange={this.props.inputChange}/>
        <button type="submit">Push</button>
      </form>
    )
  }
}

export default Input
