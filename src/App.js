import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import BoxItem from "./components/boxItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  //You can use multiple states over here
  const [state, setState] = useState({
    boxes: new Array(9).fill(""),
    currentPlayer: "one",
    winnerPlayer: null,
    isTie: null,
  });

  useEffect(() => {
    //Check winner
    checkWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.boxes]);

  useEffect(() => {
    //Check winner
    showWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.winnerPlayer]);

  const clickItem = (itemIndex) => {
    if (state.winnerPlayer) {
      setState({
        ...state,
      });
      return;
    }

    if (state.boxes[itemIndex] === "") {
      //Copy boxes from state
      const copyBoxesFromState = [...state.boxes];
      //Fill this value to box
      copyBoxesFromState[itemIndex] = state.currentPlayer;

      //swithch player
      const swithchPlayer = state.currentPlayer === "one" ? "two" : "one";

      //Set new state
      setState({
        ...state,
        boxes: copyBoxesFromState,
        currentPlayer: swithchPlayer,
      });
    } else {
      //Show warning that please choose another one
      toast.error("You have already selected it!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  function checkWinner() {
    //winner array
    const winnerArray = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //Get player1 entries from state
    let player1 = [];
    state.boxes.forEach((el, i) => {
      if (el === "one") {
        player1.push(i);
      }
    });

    //Get player1 entries from state
    let player2 = [];
    state.boxes.forEach((el, i) => {
      if (el === "two") {
        player2.push(i);
      }
    });

    //Check player1 entries matches from state
    let player1Winner = winnerArray.find((ar) => {
      return ar.every((el) => player1.includes(el));
    });

    if (player1Winner) {
      setState({
        ...state,
        isWinner: true,
        winnerPlayer: "one",
      });
      return;
    }

    //Check player2 entries matches from state
    let player2Winner = winnerArray.find((ar) => {
      return ar.every((el) => player2.includes(el));
    });

    if (player2Winner) {
      setState({
        ...state,
        isWinner: true,
        winnerPlayer: "two",
      });
      return;
    }

    if (state.boxes.every((e) => e !== "")) {
      setState({
        boxes: new Array(9).fill(""),
        currentPlayer: "one",
        winnerPlayer: null,
        isTie: null,
      });

      toast.error(`Game Tie...`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  const showWinner = () => {
    //Show toast for winner
    if (state.winnerPlayer) {
      toast.success(`Player ${state.winnerPlayer} won`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const playAgain = () => {
    setState({
      boxes: new Array(9).fill(""),
      currentPlayer: "one",
      winnerPlayer: null,
      isTie: null,
    });
  };

  return (
    <div className="container game-container">
      <ToastContainer />
      <h3 className="text-uppecase mb-3">Play tiktak Game...</h3>
      {state.winnerPlayer || state.isTie ? (
        <button
          className="btn btn-danger d-block play-again"
          onClick={playAgain}
        >
          Play Again?
        </button>
      ) : (
        ""
      )}
      <div className="row">
        {state.boxes.map((b, index, ar) => (
          <BoxItem
            activeClass={
              b === "one" ? "active-class" : b === "two" ? "green-class" : ""
            }
            key={index}
            icon={b}
            click={() => clickItem(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
