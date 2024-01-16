import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({ urls }) => {
  console.log(urls, "urls prop");
  const urlEls = urls.map(url => {
    return (
      <div className="url">
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
      </div>
    );
  });

  console.log(urlEls, "urlEls")

  return (
    <section>
      { urlEls.length > 0 ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
