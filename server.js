const express = require('express');
const app = express();
const apiQuoteRouter = express.Router();

app.use("/api/quotes", apiQuoteRouter)

const { quotes } = require('./data');
const { getRandomElement, retreiveAllQuotes, postData, retrieveAllAuthors } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

apiQuoteRouter.get("/", (req, res, next) =>{

    const person = req.query.person;

    // console.log(person);

    if (quotes) {
        if (person && person !== "NIL"){
            let arrOfQuotes = retreiveAllQuotes(person, quotes);
            if (arrOfQuotes.length){
                res.status(200).send({"quote": arrOfQuotes, "person": person});
            } else {
                res.status(202).send({"quote": arrOfQuotes, "person": person, authors: retrieveAllAuthors(quotes)});
            }
        } else if (person === "NIL"){
            res.status(201).send({"quote":"", "authors":retrieveAllAuthors(quotes)})
        }else {
            res.status(200).send({quotes});
        }
        
    } else {
        res.status(404).send();
    }
})

apiQuoteRouter.get("/random", (req, res, next)=>{
    const quoteObj = getRandomElement(quotes)
    if (quoteObj){
        res.status(200).send(quoteObj);
    } else {
        res.status(404).send();
    }
});


apiQuoteRouter.post("/", (req, res, next) =>{
    const personName = req.query.person;
    const personQuote = req.query.quote;
    if (personName && personQuote){
        postData(personQuote, personName, quotes);

        //Verify the quotes array have been updated
        const allQuote = retreiveAllQuotes(personName, quotes)
        res.status(201).send({quote: allQuote.slice(allQuote.length - 1)[0], person: personName});
    } else {
        res.status(400).send("Something went wrong"); 
    }
})


app.listen(PORT, ()=>{
    console.log(`$server starting at port=${PORT}`);
});