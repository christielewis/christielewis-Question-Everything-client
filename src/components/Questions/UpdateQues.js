import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { showQues, updateQues } from '../../api/questions'

class UpdateQues extends Component {
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

  componentDidMount () {
    const { match, user, msgAlert } = this.props
    showQues(match.params.id, user)
      .then((res) =>
        this.setState({
          title: res.data.question.title,
          topic: res.data.question.topic,
          description: res.data.question.description,
          season: res.data.question.season,
          episode: res.data.episode.date
        })
      )
      .then(() => {
        msgAlert({
          heading: 'Preloaded the update',
          message: 'Worked',
          variant: 'success'
        })
      })
      .catch(() => {
        msgAlert({
          heading: 'Preloading the update failed',
          message: 'Is not preloading it',
          variant: 'danger'
        })
      })
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, match, history } = this.props

    updateQues(match.params.id, this.state, user)
      .then(() => history.push(`/questions/${match.params.id}`))
      .then(() => {
        msgAlert({
          heading: 'Question updated',
          message: 'You\'ve successfully update your question.',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Question update failed',
          message: 'Question error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div className='box'>
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
              value={this.state.episode}
              placeholder='What episode are you up to?'
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

export default withRouter(UpdateQues)
