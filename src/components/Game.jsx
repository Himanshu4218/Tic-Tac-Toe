import useTicTacToe from "../hooks/use-tictactoe";

const Game = ({ size }) => {
  const { board, reset, getMessage, handleClick, gameOver } =
    useTicTacToe(size);

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="text-2xl font-medium">{getMessage()}</h3>
        <button className="bg-gray-200 rounded px-2 py-1" onClick={reset}>
          Reset Game
        </button>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${size},1fr)` }}
      >
        {board.map((value, index) => {
          return (
            <button
              key={index}
              disabled={value || gameOver}
              onClick={() => handleClick(index)}
              className="w-[100px] h-[100px] text-3xl bg-gray-200 border-2 border-gray-300"
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
