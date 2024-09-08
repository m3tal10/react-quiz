import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/startScreen";
import Question from "./Components/Question";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import Finished from "./Components/Finished";
import Timer from "./Components/Timer";
import Footer from "./Components/Footer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //loading,error,ready,active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      const points =
        question.correctOption === action.payload ? question.points : 0;

      return {
        ...state,
        answer: action.payload,
        points: state.points + points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        state: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown.");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, secondsRemaining, status, index, answer, points } = state;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(function () {
    fetch("https://my-json-server.typicode.com/m3tal10/Questions/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questions.length} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={questions.length}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                numQuestions={questions.length}
                index={index}
                answer={answer}
              />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            dispatch={dispatch}
            totalPoints={totalPoints}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
