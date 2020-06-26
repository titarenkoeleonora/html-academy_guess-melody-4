import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionGenre from "./question-genre";

Enzyme.configure({
  adapter: new Adapter(),
});

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `path`,
    genre: `rock`,
  }, {
    src: `path`,
    genre: `blues`,
  }, {
    src: `path`,
    genre: `jazz`,
  }, {
    src: `path`,
    genre: `rock`,
  }],
};

describe(`QuestionGenre e2e tests`, () => {
  it(`Form is not sent on submit`, () => {
    const onAnswer = jest.fn();

    const genreQuestionsScreen = shallow(
        <QuestionGenre
          question={question}
          onAnswer={onAnswer} />
    );

    const formElement = genreQuestionsScreen.find(`form`);
    const formSendPrevention = jest.fn();

    formElement.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`User's answer passed to callback is consistent with "userAnswer" prop`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    const userAnswer = [false, true, false, false];

    const genreQuestion = shallow(<QuestionGenre
      onAnswer={onAnswer}
      question={question}
    />);

    const form = genreQuestion.find(`form`);
    const inputTwo = genreQuestion.find(`input`).at(1);

    inputTwo.simulate(`change`, {target: {checked: true}});
    form.simulate(`submit`, {preventDefault() {}});

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);

    expect(
        genreQuestion.find(`input`).map((it) => it.prop(`checked`))
    ).toEqual(userAnswer);
  });
});
