const apiUrl = 'http://localhost:3001/api/v1/urls';

export const getUrls = () => {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw Error(`Could not fetch url data. Request code: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      return data.urls
    })
}

export const postUrl = (newData) => {
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
  .then(response => {
    if (!response.ok) {
      throw Error(`Could not post new url. Request code: ${response.status}`)
    }
    return response.json()
  })
  .then(addedUrl => {
    return getUrls()
  })
  .catch(error => {
    alert(error.message);
    console.log(error);
  });
}