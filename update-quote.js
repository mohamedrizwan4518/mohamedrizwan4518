const fs = require('fs');

async function updateQuote() {
  try {
    const quotes = require('./quotes.json');
    let randomIndex;
    let quoteToUse;
    let maxRetries = 10;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
      quoteToUse = quotes[randomIndex];
      maxRetries--;
    } while (quoteToUse.author === 'Michael Jordan' && maxRetries > 0);

    const { quote, author } = quoteToUse;

    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
    <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=220a28&author_color=ffeb95&accent_color=c56a90">
</p>
<!--ENDS_HERE_QUOTE_CARD-->`;

    const readmePath = './README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    readmeContent = readmeContent.replace(
      /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/,
      cardDesign.trim()
    );

    fs.writeFileSync(readmePath, readmeContent);
    console.log('Successfully updated quote to:', author, '-', quote);
  } catch (error) {
    console.error('Error updating quote:', error);
  }
}

updateQuote();
