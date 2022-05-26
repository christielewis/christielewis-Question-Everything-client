import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { indexAllQues } from '../../api/questions'

class IndexAllQues extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: []
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexAllQues(user)
      .then((res) => {
        console.log(res.data)
        return res
      })
      .then((res) => this.setState({ questions: res.data.questions }))
      .then(() => {
        msgAlert({
          heading: 'Index success',
          message: 'Showing all your questions',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Index fail',
          message: 'Index error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { questions } = this.state

    if (questions === null) {
      return 'Loading...'
    }

    let quesJSX
    if (questions.length === 0) {
      quesJSX = 'You have not asked any questions. Try asking one!'
    } else {
      quesJSX = questions.map((ques) => (
        <li key={ques._id}>
          <Link to={`/questions/${ques._id}`}>
            <h3>{ques.title}: Season:{ques.season} Episode:{ques.episode}</h3>
          </Link>
          <h4>{ques.topic}</h4>
          <p>{ques.description}</p>
          <hr/>
        </li>
      ))
    }

    return (
      <>
        <h3>Questions:</h3>
        <ul>
          {quesJSX}
        </ul>
      </>
    )
  }
}

export default IndexAllQues
