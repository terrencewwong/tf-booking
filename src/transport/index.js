if (typeof document !== 'undefined') require('isomorphic-fetch')

function fetchFrom ({ method, url, body }) {
  const data = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (body) {
    data.body = JSON.stringify(body)
  }

  return fetch(url, data)
    .then(response => {
      if (response.ok) {
        // valid response
        return response.json()
          .catch(() => null) // return null when json is invalid (eg. body is empty)
      }
    })
}

export const createPoll = ({ id, payload }) => {
  return fetchFrom({
    method: 'POST',
    url: `/api/polls/${id}`,
    body: payload
  })
}

export const getPoll = (id) => {
  return fetchFrom({
    method: 'GET',
    url: `/api/polls/${id}`
  })
}

export const updatePoll = ({ id, payload }) => {
  return fetchFrom({
    method: 'PUT',
    url: `/api/polls/${id}`,
    body: payload
  })
}
