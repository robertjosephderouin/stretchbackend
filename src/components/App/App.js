import './App.css';
import Jobs from '../Jobs/Jobs';
import React, { Component } from 'react'
import { getJobs, deleteJob, bookJob } from '../../api-calls'

class App extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      error: ''
    }
  }

  componentDidMount = () => {
    getJobs()
      .then(data => {
        this.setState({ jobs: data })
      })
      .catch(() => {
        this.setState({ error: 'something went wrong' })
      })
  }

  bookThisJob = (id) => {
    bookJob(id)
      .then(() => {
        getJobs()
          .then(data => {
            this.setState({ jobs: data })
          })
          .catch(() => {
            this.setState({ error: 'something went wrong' })
          })
      })
      .catch(() => {
        this.setState({ error: 'something went wrong' })
      })
  }

  removeJob = (id) => {
    const filteredJobs = this.state.jobs.filter(job => job.id !== id);
    this.setState({ jobs: filteredJobs });
    deleteJob(id)
      .catch(() => {
        this.setState({ error: 'something went wrong' })
      })
  }

  render() {
    return (
      <main className="App">
        <h1>Space Truckers</h1>
        <h2 className='subtitle'>"Where were going, there are no laws."</h2>
        <Jobs jobs={this.state.jobs} removeJob={this.removeJob} bookThisJob={this.bookThisJob} />
      </main>
    );
  }
}

export default App;
