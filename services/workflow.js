import 'isomorphic-fetch'
import { BASE_API_URL } from 'constants/environment'

export async function getAllWorkflows(token) {
  let workflows = []
  try {
    const res = await fetch(`${BASE_API_URL}/api/workflow`, {
      headers: { Accept: 'application/json', Authorization: token },
    })
    if (res.status >= 400) {
      return { statusCode: res.status, workflows }
    } 
    workflows = await res.json()
    return { statusCode: false, workflows }
  } catch({ message }) {
    return { statusCode: 503, workflows }
  }
}

export async function getWorkflow(token, id) {
  let workflow = []
  try {
    const res = await fetch(`${BASE_API_URL}/api/workflow/${id}`, {
      headers: { Accept: 'application/json', Authorization: token }
    })
    if (res.status >= 400) {
      return { statusCode: res.status, workflows }
    } 
    workflow = await res.json()
    return { statusCode: false, workflow }
  } catch ({ message }) {
    return { statusCode: 503, workflow }
  }
}

export async function addWorkflow(token, payload) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/workflow`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: token, },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.log(message)
  }
}

export async function updateWorkflow(token, id, payload) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/workflow/${id}`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.log(message)
  }
}

export async function deleteWorkflow(token, id) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/workflow/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', Authorization: token },
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.log(message)
  }
}