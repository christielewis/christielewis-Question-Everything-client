import apiUrl from '../apiConfig'
import axios from 'axios'

export const createAns = (data, user) => {
  console.log(data)
  return axios({
    method: 'POST',
    url: apiUrl + '/answers',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      answer: {
        text: data.text,
        questionId: data.questionId
      }
    }
  })
}

export const updateAns = (id, data, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/answers/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      answer: {
        text: data.text
      }
    }
  })
}

export const deleteAns = (id, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/answers/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
