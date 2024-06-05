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

const postData = (quote, person, arr) => {
  arr.push({"quote": quote, "person": person});
} 

module.exports = {
  retreiveAllQuotes,
  getRandomElement,
  postData
};
