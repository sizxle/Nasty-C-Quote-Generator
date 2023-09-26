let data;
const textElement= document.getElementById('text')
const authorElemnt= document.getElementById('author')
const tweetButton=document.getElementById('tweet-quote')

async function fetchQuotes(){
    try{
        const response = await fetch('Quotes.json');
        data= await response.json();
        return data;
    }catch(error){
        console.error('Error fetching quotes:',error);
        return [];
    }
}

function getRandomQuote(quotes){
    const randomIndex= Math.floor( Math.random() * quotes.quotes.length);
    return(quotes.quotes[randomIndex])
}


async function displayQuote(){
    const quotes = await fetchQuotes();
    const randomQuote =getRandomQuote(quotes);
    textElement.textContent=randomQuote.quote;
    authorElemnt.textContent=randomQuote.author;

    //tweet function
    const tweetText= encodeURI(`"${randomQuote.quote}" - ${randomQuote.author}`)
    const tweetUrl =`https://twitter.com/intent/tweet?text=${tweetText}`
    tweetButton.href=tweetUrl;
}

$('#new-quote').on('click',displayQuote);
$(document).ready(function(){
    displayQuote();
});