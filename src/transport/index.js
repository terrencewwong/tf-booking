if (typeof document !== 'undefined') require('isomorphic-fetch')

function fetchFrom ({ method, url, body }) {
  const data = {
    method: method
  }

  if (body) {
    data.body = JSON.stringify(body)
  }

  return fetch(url, data)
}

export const createPoll = ({ id, payload }) => {
  return fetchFrom({
    method: 'POST',
    url: `/api/polls/${id}`,
    body: payload
  })
}
