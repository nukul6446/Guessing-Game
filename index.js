const express = require('express');
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Generate a random number between 1 and 15
let secretNumber = Math.floor(Math.random() * 15) + 1;

// Route to display the game
app.get('/', (req, res) => {
  res.render('game', { title: 'Guess Number Game', hint: 'Try a number between 1 and 15' });
});

// Route to handle the guess
app.post('/guess', (req, res) => {
  const userGuess = parseInt(req.body.guess);

  if (userGuess === secretNumber) {
    res.render('win', { title: 'You Won!', secretNumber: secretNumber });
  } else {
    const hint = userGuess < secretNumber 
      ? `Guess higher! Try a number between ${userGuess + 1} and 15.` 
      : `Guess lower! Try a number between 1 and ${userGuess - 1}.`;

    res.render('game', { title: userGuess < secretNumber ? 'Too Low!' : 'Too High!', hint: hint });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
