import 'isomorphic-fetch'
import { BASE_API_URL } from 'constants/environment'

export async function getAllWorkflows(token) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/workflow`, {
      headers: { Accept: 'application/json', Authorization: token },
    })
    const data = await res.json()
    return data
  } catch({ message }) {
    console.error(message)
  }
}

export async function getWorkflow(token, id) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/workflow/${id}`, {
      headers: { Accept: 'application/json', Authorization: token }
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.error(message)
  }
}

export async function addWorkflow(token, payload) {
  try {
    const res = fetch(`${BASE_API_URL}/api/workflow`, {
      method: 'POST',
      headers: { Accept: 'application/json', Authorization: token },
      body: payload
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.log(message)
  }
}

export async function updateWorkflow(token, id, payload) {
  try {
    const res = fetch(`${BASE_API_URL}/api/workflow/${id}`, {
      method: 'PUT',
      headers: { Accept: 'application/json', Authorization: token },
      body: payload
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.log(message)
  }
}

export async function deleteWorkflow(token, id) {
  try {
    const res = fetch(`${BASE_API_URL}/api/workflow/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', Authorization: token },
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.log(message)
  }
}