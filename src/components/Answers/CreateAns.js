import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createAns } from '../../api/answers'

class CreateAns extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: '',
      questionId: this.props.match.params.id
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props)
    // console.log(this.state.questionId)
    const { user, msgAlert, history } = this.props

    createAns(this.state, user) // must add question id
      .then((res) => {
        console.log(res.data)
        return res
      })
      .then(() => history.push(`/questions/${this.state.questionId}`))
      .then(() => {
        msgAlert({
          heading: 'Answer Posted!',
          message: 'Now, just wait on someone to answer.',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Error Posting Answer!',
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div className='box3'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='text'>
            <Form.Label>Answer</Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={5}
              name='text'
              value={this.state.text}
              placeholder='Your Answer'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button className='createBtn' type='submit'>
            Post
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateAns)
