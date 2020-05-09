import React from "react";
import { Redirect } from "react-router-dom";
import AppContext from '../../libs/AppContext.js';


/*
Initial component for users to create projects
*/
class CreateProjectComponent extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      explanation: null,
      price: null,
      due_date: null,
      owner_id: null,
      redirect: null,
      result: null
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleExplanationChange = this.handleExplanationChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDueDate = this.handleDueDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.context.getAuth()){
      this.setState({
        owner_id: this.context.getAuth().person_id
      });
    } else {
      this.setState({
        redirect: '/login'
      });
    }
  }

  handleTitleChange(event)
  {
    this.setState({title: event.target.value});
  }

  handleExplanationChange(event)
  {
    this.setState({explanation: event.target.value});
  }

  handlePriceChange(event)
  {
    this.setState({price: event.target.value});
  }

  handleDueDate(event)
  {
    this.setState({due_date: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch("api/project/create", {
      method: 'post',
      body: JSON.stringify({
        owner_id: this.state.owner_id,
        title: this.state.title,
        explanation: this.state.explanation,
        price: this.state.price,
        due_date: this.state.due_date
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()
    ).then(data => {
      var txtex = this.data.project_id + " was created";

      this.setState(() => ({
        result: "yes"
      }));
    }).catch((err) => {
      ///We're going to want to log to some sort of logging tool here, splunk?
      console.log('New error with server itself? ' + err);
    });
  }

  render() {
    if (this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    else {
      return (
        <div>
          <div>
            <div>
              <h1>Create project</h1>
              <br />
            </div>
            <form onSubmit={this.handleSubmit}>
              <label>Title</label>
              <input type="text" name="title" onChange={this.handleTitleChange} />
              <br />
              <label>Explanation</label>
              <input type="text" name="explanation" onChange={this.handleExplanationChange} />
              <br />
              <label>Price</label>
              <input type="number" min="0.01" max="1000000" step = "0.01" name="price" onChange={this.handlePriceChange} />
              <br />
              <label>Due Date</label>
              <input type="date" name="due_date" onChange={this.handleDueDateChange} />
              <br />
              <input type='submit' value='Submit' />
            </form>
          </div>

          <h1>{this.state.result}</h1>
        </div>
      );
    }
  }
}

export default CreateProjectComponent;