import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showQues, deleteQues } from '../../api/questions'
import Button from 'react-bootstrap/Button'

class ShowQues extends Component {
  constructor (props) {
    super(props)

    this.state = {
      question: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props
    // console.log(match)

    showQues(match.params.id, user)
      .then((res) => this.setState({ question: res.data.question }))
      .then(() => {
        msgAlert({
          heading: 'Successfully Showing Question',
          message: 'WooHoo!',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Show Question Failed',
          message: 'Error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleDelete = () => {
    const { match, user, msgAlert, history } = this.props

    deleteQues(match.params.id, user)
      .then(() => history.push('/questions/'))
      .then(() => {
        msgAlert({
          heading: 'Successfully Deleted Question',
          message: 'WooHoo!',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Delete Question Failed',
          message: 'Error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { question } = this.state

    if (question === null) {
      return 'Loading...'
    }

    const { title, topic, description, season, episode, owner } = this.state.question
    const { user, match, history } = this.props
    return (
      <div className='box2'>
        <h3>{title}: Season:{season} Episode:{episode}</h3>
        <h4>{topic}</h4>
        <p>{description}</p>
        {user._id === owner && (
          <>
            <Button className='upBtn' onClick={() => history.push(`/questions/${match.params.id}/update`)}>
              Update
            </Button>
            <Button className='delBtn' onClick={this.handleDelete}>
              Delete
            </Button>
          </>
        )}
        {/* {user._id !== owner && (
          <>
            <Button className='ansBtn' onClick={() => history.push(`/questions/${match.params.id}/answers`)}>Answer</Button>
          </>
        )} */}
      </div>
    )
  }
}

export default withRouter(ShowQues)
