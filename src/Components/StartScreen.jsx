function StartScreen({ dispatch, numQuestions }) {
  function handleClick() {
    dispatch({ type: "start" });
  }
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery.</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
