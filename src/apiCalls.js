export const getUrls = () => {
  const apiUrl = 'http://localhost:3001/api/v1/urls';
  return fetch(apiUrl)
    .then(response => response.json())
}
