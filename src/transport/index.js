import 'isomorphic-fetch'

function fetchFrom ({ method, url, body }) {
  const data = {
    method: method
  }

  if (body) {
    data.body = JSON.stringify(body)
  }

  return fetch(url, data)
}
