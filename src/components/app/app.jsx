import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionArtist from "../question-artist/question-artist.jsx";
import QuestionGenre from "../question-genre/question-genre.jsx";
import {GameType} from "../../const.js";

const App = (props) => {
  const {questions, errorsCount} = props;
  const [step, setStep] = useState(-1);

  const getStep = () => {
    setStep(0);
  };

  const renderGameScreen = () => {
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          onWelcomeButtonClick={getStep}
          errorsCount={errorsCount}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <QuestionArtist
              question={question}
              onAnswer={() => {
                setStep(step + 1);
              }}
            />
          );
        case GameType.GENRE:
          return (
            <QuestionGenre
              question={question}
              onAnswer={() => {
                setStep(step + 1);
              }}
            />
          );
      }
    }
    return null;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderGameScreen()}
        </Route>
        <Route exact path="/artist">
          <QuestionArtist
            question={questions[1]}
            onAnswer={() => {}}
          />
        </Route>
        <Route exact path="/genre">
          <QuestionGenre
            question={questions[0]}
            onAnswer={() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
