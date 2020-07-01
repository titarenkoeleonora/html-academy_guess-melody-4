import React, {useState} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";

const QuestionGenre = (props) => {
  const {onAnswer, question} = props;
  const {genre} = question;
  const [answers, setAnswers] = useState([false, false, false, false]);

  const getAnswers = (evt, i) => {
    const value = evt.target.checked;


    setAnswers([...answers.slice(0, i), value, ...answers.slice(i + 1)]);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer(question, answers);
        }}
      >
        {answers.map((answer, i) => (
          <div key={`${i}-${answer.src}`} className="track">
            <button className="track__button track__button--play" type="button"/>
            <div className="track__status">
              <audio
                src={answer.src}
              />
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                id={`answer-${i}`}
                onChange={((evt) => getAnswers(evt, i))}
                checked={answers[i]}
              />
              <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
            </div>
          </div>
        ))}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

QuestionGenre.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};

export default QuestionGenre;
