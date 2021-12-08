import React, { Component }  from 'react'
import './display.css';

class Display extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
    this.delete = this.delete.bind(this)
  }

  delete(id) {
    const filter = [...this.state.data].filter((n)=> n.id !== id)

    this.setState({data: filter})
  }

  update(id) {
    
  }

  render() {
    let listitem = this.state.data.map((n) =>
    <li key={n.id}>
      <input type="checkbox" checked={n.completed} />
      <p onDoubleClick={()=> {this.update(n.id)}}>{n.val}</p>
      <button type="button" onClick={()=> {this.delete(n.id)}}>delete</button>
    </li>
    )
    return (
      <ul className="list">
        {listitem}
      </ul>
    )
  }
}

export default Display
