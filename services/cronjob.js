import 'isomorphic-fetch'
import { BASE_API_URL } from 'config'

export async function getAllCronJobs(token) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/cronjob`, {
      headers: { Accept: 'application/json', Authorization: token },
    })
    const data = await res.json()
    return data
  } catch({ message }) {
    console.error(message)
  }
}

export async function getCronJob(token, id) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/cronjob/${id}`, {
      headers: { Accept: 'application/json', Authorization: token }
    })
    const data = await res.json()
    console.log(data)
    return data
  } catch ({ message }) {
    console.error(message)
  }
}

export async function addCronJob(token, payload) {
  try {
    const res = fetch(`${BASE_API_URL}/api/cronjob`, {
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

export async function updateCronJob(token, id, payload) {
  try {
    const res = fetch(`${BASE_API_URL}/api/cronjob/${id}`, {
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

export async function deleteCronJob(token, id) {
  try {
    const res = fetch(`${BASE_API_URL}/api/cronjob/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', Authorization: token },
    })
    const data = await res.json()
    return data
  } catch ({ message }) {
    console.log(message)
  }
}