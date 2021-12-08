import './App.css';

import React, { Component } from 'react'
import Input from './Input';

let id = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      item: '',
      comp: true,
      editing: ''
    }
    this.add = this.add.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.delete = this.delete.bind(this)
    this.complete = this.complete.bind(this)
    this.allCompleted = this.allCompleted.bind(this)
    this.showAll = this.showAll.bind(this)
    this.showPending = this.showPending.bind(this)
    this.showCompleted = this.showCompleted.bind(this)
    this.doEditing = this.doEditing.bind(this)
    this.edited = this.edited.bind(this)
  }

  inputChange(e) {
    this.setState({ item: e.target.value })
  }

  add(e) {
    e.preventDefault();
    if (this.state.item !== "") {
      const temp = { val: this.state.item, id: id++, completed: false }

      this.state.data.push(temp)
      this.setState({ data: this.state.data })
      localStorage.setItem('lists', JSON.stringify(this.state.data));

      document.getElementById('items').value = "";
      this.setState({ item: '' })
    } else {
      console.warn('enter something');
    }
  }

  delete(sel) {
    const filter = [...this.state.data].filter((n) => n.id !== sel)
    this.setState({ data: filter })
  }

  complete(sel) {
    const filter = [...this.state.data].map((n) => {
      if (n.id === sel) {
        n.completed = !n.completed
      }
      return n
    })
    localStorage.setItem('lists', JSON.stringify(this.state.data));
    this.setState({ data: filter })
  }

  allCompleted() {
    const all = [...this.state.data].map((n) => {
      if (n.completed !== this.state.comp) {
        n.completed = this.state.comp
      }
      this.setState({ comp: !this.state.comp })
      return n
    })
    localStorage.setItem('lists', JSON.stringify(this.state.data));
    this.setState({ data: all })
  }

  showAll() {
    this.setState({ data: JSON.parse(localStorage.getItem('lists')) })
  }

  showPending() {
    const temp = JSON.parse(localStorage.getItem('lists'))
    const pend = [...temp].filter((n) => n.completed === false)
    this.setState({ data: pend })
  }

  showCompleted() {
    const temp = JSON.parse(localStorage.getItem('lists'))
    const done = [...temp].filter((n) => n.completed === true)
    this.setState({ data: done })
  }

  doEditing(sel) {
    this.setState({editing: sel})
    console.log(this.state.editing);
  }

  edited() {
    const update = [...this.state.data].map((n) => {
      if(n.id === this.state.editing){
        n.val = this.state.item
      }
      return n
    })
    
    localStorage.setItem('lists', JSON.stringify(this.state.data));
    this.setState({data: update})
    this.setState({editing: null})
    this.setState({item: ''})
  }

  render() {
    let listitem = this.state.data.map((n) =>
      <li key={n.id}>
        <input type="checkbox" onChange={() => { this.complete(n.id) }} checked={n.completed} />
        {(this.state.editing === n.id) ? 
        <div>
          <input type="text" onChange={this.inputChange} value={this.state.item}></input>
          <button type='button' onClick={this.edited}>edit</button>
          </div> 
          : <p onDoubleClick={()=> {this.doEditing(n.id)}}>{n.val}</p>}
        <button type="button" onClick={() => { this.delete(n.id) }}>delete</button>
      </li>
    )
    return (
      <div>
        <Input val={this.state.item} inputChange={this.inputChange} addToList={this.add} allCompleted={this.allCompleted} />
        <ul className="list">
          {listitem}
        </ul>

        <div className="btn-ctn">
          {(this.state.data.length !== 0) ? <p>{this.state.data.length} items</p> : null}
          <button type="button" onClick={this.showAll}>All</button>
          <button type="button" onClick={this.showPending}>Pending</button>
          <button type="button" onClick={this.showCompleted}>Completed</button>
        </div>

      </div>
    )
  }
}

export default App
