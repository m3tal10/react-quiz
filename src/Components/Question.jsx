function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            disabled={answer !== null}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              answer !== null && i === question.correctOption
                ? "correct"
                : "wrong"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
