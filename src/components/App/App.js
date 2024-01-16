import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  const postNew = async (newData) => {
    const data = await postUrl(newData)
    setUrls([...urls, data])
  }

  useEffect(() => {
    getUrls()
    .then(data => setUrls([...urls, ...data]))
  }, []);

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm postNew={ postNew } />
      </header>
      <UrlContainer urls={ urls }/>
    </main>
  );
}

export default App;
