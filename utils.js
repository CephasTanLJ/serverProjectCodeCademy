const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const retreiveAllQuotes = (name, arr) =>{
  const quoteArr = [];

  arr.forEach(elementObj => {
    if (name === elementObj.person){
      quoteArr.push(elementObj.quote);
    }
  })

  return quoteArr;
}

const retrieveAllAuthors = (arr) => {
  const authorsSet = new Set([]);

  arr.forEach(itemObj => {
    authorsSet.add(itemObj.person)
  });

  const authorsArray = Array.from(authorsSet);

  return authorsArray;
}

const postData = (quote, person, arr) => {
  arr.push({"quote": quote, "person": person});
} 

module.exports = {
  retreiveAllQuotes,
  getRandomElement,
  postData,
  retrieveAllAuthors
};
