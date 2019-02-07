import React, { Component } from 'react';
import classes from './App.module.css';

class App extends Component {
  state = {
    keywordss: [],
    addTask: false,
    cancelTask: false,
    dropdown: false
  }

  getLabels = keyword => {
    const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
    const result = allLabels
      .filter(function(x) {
        return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
    return result;
  }

  getLabelsAsync = keyword => {
    const result = this.getLabels(keyword);
    const delay = Math.random() * 800 + 200; // delay 200~1000ms
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, delay, result);
    });
  }

  handleChange = e => {
    this.setState({
      dropdown: false
    })
    const word = e.target.value;
    if (word.includes("@")) {
      const keywords = this.getLabels(word.substring(word.indexOf('@')+1))
      console.log(keywords)
      keywords.forEach(word => console.log(word));
      this.setState({
        keywords: keywords,
        dropdown: true
      })
      console.log(this.state.dropdown)
    }
  }

  handleAddTask = () => {
    this.setState({
      addTask: true
    })
  }

  handleCancelTask = () => {
    this.setState({
      keywords: [],
      addTask: false,
      cancelTask: true
    })
  }

  handleLabelColor = (keyword) => {
    switch (keyword) {
      case 'NextActions':
        return 'green'
      case 'Someday_Actions':
        return 'blue'
      case 'Costco':
        return 'red'
      case 'Alexa':
        return 'orange' 
      default:
        return '';
    }
  }

  handleKeyPress = e => {
    // when user tabs or press enter, the keyword display on input
    if (e.keyCode === 9 || e.keyCode === 13) {
      console.log(this.state.keyword[0])
      return this.state.keyword[0]
    }
  }

  handleClick = () => {
    console.log(this.state.keyword[0])
    return this.state.keyword[0]
  }

  render() {
    return (
      <div className={classes.App}>
        <div className='container'>
          <div className='container col-6'>
            <div className="row">
              <div className='col-7'>Inbox</div>
              <div className='col-2'><i className="far fa-comment-alt"></i></div>
              <div className='col-2 text-right'><i className="fas fa-ellipsis-h"></i></div>
            </div>
          </div>
          
          { 
            this.state.addTask ?

            <div className='container col-6'>
              <form action="" className='form-group col-12 row'>
                <input 
                  className='form-control' 
                  onChange={this.handleChange.bind(this)}
                  type="text"
                  onKeyPress={this.handleKeyPress.bind(this)} />
                
              </form>
              { this.state.dropdown ? 
                <div className='mb-5'>
                  { this.state.keywords.map(word => (
                      <div className='dropdown-item'
                        onClick={this.handleClick.bind(this)}>
                          <i className="fas fa-tag" style={ { color: this.handleLabelColor(word) } } />
                          {word} {this.handleLabelColor(word)}
                      </div>
                    ))
                  }
                </div>
                  :
                null
              }
              <div className='container row'>
                <button 
                  onClick={this.handleAddTask.bind(this)}
                  className='btn btn-danger'
                  >Add Task</button>
                <button 
                  onClick={this.handleCancelTask.bind(this)}
                  className='btn btn-link text-secondary'>Cancel</button>
              </div>
            </div> :
            <div className='container col-6'>
              <i className="fas fa-plus"></i> <button className='btn btn-link' onClick={() => this.handleAddTask()}>Add Task</button>
            </div>
          }

        </div>
      </div>  
    );
  }
}

export default App;

