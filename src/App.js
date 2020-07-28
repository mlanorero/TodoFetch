import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
      this.state ={
      newTask: "",
      tasks: []
    }
  }

  handleTaskChange = (event) => {
    this.setState({
      newTask : event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let newTasks = this.state.tasks;
    newTasks.push(this.state.newTask)
    this.setState({
      newTask: "",
      tasks: newTasks
    })
  }
  handleDelete = (id) => {
    let newTasks = this.state.tasks;
    newTasks.splice(id, 1)
    this.setState({
      tasks: newTasks,
    })
  }
  componentDidMount = () => {
    this.fetchData();
  }
  fetchData = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/laura")
      .then(response => response.json())
      .then(parsedJSON => console.log(parsedJSON.results.map(task => (
        {
          label: task, done:false
        }
      ))))
      .catch(error => console.log('parsing failed', error))
  }
  
  
  render() {
    return (
      <div className="App">
        <div className="container">
          <h2 className="title">
              Todo List
          </h2>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.newTask} onChange={this.handleTaskChange} type="text" className="new-task"/>
            <button onClick={this.handleSubmit}>Add</button>
          </form>
          <h2 className="test-label">{this.state.newTask}</h2>
           {
             this.state.tasks.map((task, index) =>
                <h1 key={index}>
                    {" "}
                    {task}
                    <i
                      id="tareas"
                      onClick={e => {
                        this.handleDelete(index);
                      }}>
                      &times;
                    </i>
                </h1>
          )}
        </div>
      </div>
    );
  }
}

export default App;
