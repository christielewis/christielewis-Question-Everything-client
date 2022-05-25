import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createQues } from '../../api/questions'

class createQues extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      topic: '',
      description: '',
      season: '',
      episode: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props

    createQues(this.state, user)
      .then(() => history.push('/questions/'))
      .then(() => {
        msgAlert({
          heading: 'Question Posted!',
          message: 'Now, just wait on someone to answer.',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Error Posting Question!',
          message: 'Error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type='text'
              name='title'
              value={this.state.title}
              placeholder='Anime Title'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='topic'>
            <Form.Label>Topic</Form.Label>
            <Form.Control
              required
              type='text'
              name='topic'
              value={this.state.topic}
              placeholder='Question Topic'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={4}
              name='description'
              value={this.state.description}
              placeholder='Expand on your question'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='season'>
            <Form.Label>Season</Form.Label>
            <Form.Control
              required
              type='text'
              name='season'
              value={this.state.season}
              placeholder='What season are you up to?'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='episode'>
            <Form.Label>Episode</Form.Label>
            <Form.Control
              required
              type='text'
              name='episode'
              value={this.state.topic}
              placeholder='What episode are you up to?'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button className='createBtn' type='submit'>
            Post
          </Button>
        </Form>
      </>
    )
  }
}
