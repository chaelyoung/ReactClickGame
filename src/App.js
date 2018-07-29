import React, { Component } from 'react';
import logo from './logo.svg';
import Pics from "./components/Pics";
import Container from "./components/Container";
import Top from "./components/Top";
import matches from "./match.json";
import './App.css';

// defining variables with "let"
// variables will change throughout game
let correctStreak = 0;
let scoreTotal = 0;
let clickMessage = "Make sure you only click on each image once. If you master this, you're destined for greatness!";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Clickity Click Click</h1>
        </header>
        <p className="App-intro">

        </p>
      </div>
    );
  }

  // set to json array
  state = {
    matches,
    correctStreak,
    scoreTotal,
    clickMessage
  };

  setClicked = id => {
    const matches = this.state.matches;
    const clickedMatch = matches.filter(match => match.id === id);

    // when player clicks an image twice
    if (clickedMatch[0].clicked) {
      correctStreak = 0;
      clickMessage = "You must also be bad at remembering names. Try again!"

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctStreak });
      this.setState({ matches });

      // when player clicks on new images
    } else if (correctStreak < 9) {
      clickedMatch[0].clicked = true;
      correctStreak++;
      clickMessage = "Keep calm and carry on.";
      if (correctStreak > scoreTotal) {
        scoreTotal = correctStreak;
        this.setState({ scoreTotal });
      }

      // Randomizes array
      matches.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ correctStreak });
      this.setState({ clickMessage });
    } else {

      clickedMatch[0].clicked = true;

      // resets correct streak
      correctStreak = 0;

      // When player wins
      clickMessage = "...you're destined to save the world with that kind of skill. Good job!";
      scoreTotal = 10;
      this.setState({ scoreTotal });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      // Randomizes array
      matches.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ correctStreak });
      this.setState({ clickMessage });

    }
  };

  render() {
    return (
      <Container>
        <Top>The people you meet in your everyday life!</Top>

        <h3 className="scoreSummary">
          {this.state.clickMessage}
        </h3>

        <h3 className="scoreSummary">
          Correct Streak: {this.state.correctStreak}
          <br />
          Score Total: {this.state.scoreTotal}
        </h3>

        {this.state.matches.map(match => (
          <Pics
            setClicked={this.setClicked}
            id={match.id}
            key={match.id}
            image={match.image}
          />
        ))}
      </Container>
    );
  }

}

export default App;
