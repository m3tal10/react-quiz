function Finished({ points, dispatch, totalPoints }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <button className="btn btn-ui" onClick={() => location.reload()}>
        Restart Quiz
      </button>
    </>
  );
}

export default Finished;
