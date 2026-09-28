function Stats({ tasks }) {
  const remaining = tasks.filter((task) => !task.completed).length;
  const completed = tasks.filter((task) => task.completed).length;

  return (
    <div className="stats">
      <span>
        <strong>{remaining}</strong> remaining
      </span>
      <span className="stats__divider">•</span>
      <span>
        <strong>{completed}</strong> completed
      </span>
      <span className="stats__divider">•</span>
      <span>
        <strong>{tasks.length}</strong> total
      </span>
    </div>
  );
}

export default Stats;