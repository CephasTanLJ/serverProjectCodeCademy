const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      
      const dummy = quote.quote
      if (Array.isArray(dummy)){
        const fullQuote = dummy.join("</br></br>");
        
        newQuote.innerHTML = `<div class="quote-text">${fullQuote}</div>
        <div class="attribution"> </br>- ${quote.person}</div>`;

      } else {
        newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>`;

      }

      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  let author = document.getElementById('author').value;
  if (author===""){
    author = "NIL"
  }

  fetch(`/api/quotes?person=${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    if (author === "NIL"){
      renderQuotes([{quote:`Please enter one of these author's name: </br>"${response.authors.join("</br>")}"`, person: ""}]);
    } else if (response.quote.length === 0){
      renderQuotes([{quote:`<strong><i>${response.person}
      </i></strong> does not exits in our database...</br>
      Please enter one of these author's name: </br>${response.authors.join("</br>")}`,
      person:""
    }])
    }else {
      renderQuotes([response]);
    }
  });
});
