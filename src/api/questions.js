import apiUrl from '../apiConfig'
import axios from 'axios'

export const createQues = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/questions/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      question: {
        title: data.title,
        topic: data.topic,
        description: data.description,
        season: data.season,
        episode: data.episode
      }
    }
  })
}

export const indexQues = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/questions',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const indexAllQues = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/all',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showQues = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/questions/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateQues = (id, data, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/questions/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      question: {
        title: data.title,
        topic: data.topic,
        description: data.description,
        season: data.season,
        episode: data.episode
      }
    }
  })
}

export const deleteQues = (id, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/questions/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
