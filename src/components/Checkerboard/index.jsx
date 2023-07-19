import { useState } from 'react';
import * as constant from '../../constant';
import './index.css';
import CheckerboardLine from '../CheckerboardLine/index';

export default function Checkerboard() {
  const checkerboard = [];
  const [squares, setSquares] = useState(new Array(constant.CHECKERBOARD_HEIGHT).fill(null).map(() => new Array(constant.CHECKERBOARD_WIDTH).fill(null)));
  const [isBlack, setIsBlack] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isGameEnd, setIsGameEnd] = useState(false);

  // 上下查找
  const searchColumn = (ref, rowId, colId) => {
    let cnt = 1; // 当前位置落子数为1

    // 往上搜，查有几个同色棋子
    for (let i = rowId - 1; i >= 0 && squares[i][colId] === ref; i--) {
      cnt += 1;
    }
    // 往下搜，查有几个同色棋子
    for (let i = rowId + 1; i < constant.CHECKERBOARD_HEIGHT && squares[i][colId] === ref; i++) {
      cnt += 1;
    }
    return cnt;
  };

  // 左右查找
  const searchRow = (ref, rowId, colId) => {
    let cnt = 1; // 当前位置落子数为1

    // 往左搜，查有几个同色棋子
    for (let i = colId - 1; i >= 0 && squares[rowId][i] === ref; i--) {
      cnt += 1;
    }
    // 往右搜，查有几个同色棋子
    for (let i = colId + 1; i < constant.CHECKERBOARD_WIDTH && squares[rowId][i] === ref; i++) {
      cnt += 1;
    }
    return cnt;
  };

  // 左上和右下查找
  const searchLeftToRight = (ref, rowId, colId) => {
    let cnt = 1; // 当前位置落子数为1
    let isContinueSearch = true;
    let newColId = colId;

    // 往左上搜，查有几个同色棋子
    for (let i = rowId - 1; i >= 0; i--) {
      if (newColId - 1 >= 0) {
        if (squares[i][newColId - 1] === ref) {
          cnt += 1;
          newColId -= 1;
        } else {
          isContinueSearch = false; // 查到不是当前落子的颜色就停止搜索
        }
      }

      if (!isContinueSearch) {
        break;
      }
    }

    isContinueSearch = true;
    newColId = colId; // 回到落子位置

    // 往右下搜，查有几个同色棋子
    for (let i = rowId + 1; i < constant.CHECKERBOARD_HEIGHT; i++) {
      if (newColId + 1 < constant.CHECKERBOARD_WIDTH) {
        if (squares[i][newColId + 1] === ref) {
          cnt += 1;
          newColId += 1;
        } else {
          isContinueSearch = false; // 查到不是当前落子的颜色就停止搜索
        }
      }

      if (!isContinueSearch) {
        break;
      }
    }
    return cnt;
  };

  // 右上和左下查找
  const searchRightToLeft = (ref, rowId, colId) => {
    let cnt = 1; // 当前位置落子数为1
    let isContinueSearch = true;
    let newColId = colId;

    // 往右上搜，查有几个同色棋子
    for (let i = rowId - 1; i >= 0; i--) {
      if (newColId + 1 < constant.CHECKERBOARD_WIDTH) {
        if (squares[i][newColId + 1] === ref) {
          cnt += 1;
          newColId += 1;
        } else {
          isContinueSearch = false; // 查到不是当前落子的颜色就停止搜索
        }
      }

      if (!isContinueSearch) {
        break;
      }
    }

    isContinueSearch = true;
    newColId = colId; // 回到落子位置

    // 往左下搜，查有几个同色棋子
    for (let i = rowId + 1; i < constant.CHECKERBOARD_HEIGHT; i++) {
      if (newColId - 1 >= 0) {
        if (squares[i][newColId - 1] === ref) {
          cnt += 1;
          newColId -= 1;
        } else {
          isContinueSearch = false; // 查到不是当前落子的颜色就停止搜索
        }
      }

      if (!isContinueSearch) {
        break;
      }
    }
    return cnt;
  };

  const calWinner = (rowId, colId) => {
    const ref = squares[rowId][colId];

    const colCnt = searchColumn(ref, rowId, colId);
    const rowCnt = searchRow(ref, rowId, colId);
    const leftToRightCnt = searchLeftToRight(ref, rowId, colId);
    const rightToLeftCnt = searchRightToLeft(ref, rowId, colId);
    const cnt = Math.max(colCnt, rowCnt, leftToRightCnt, rightToLeftCnt);

    if (cnt >= constant.WIN_COUNT) {
      setIsGameEnd(true);

      if (ref === constant.PLAYER1) {
        setWinner(constant.PLAYER1_WIN_TEXT);
      } else {
        setWinner(constant.PLAYER2_WIN_TEXT);
      }
    }
  };

  const handleDrop = (colId, rowId) => {
    if (isGameEnd) {
      return;
    }

    const nextSquares = squares.slice();

    if (nextSquares[rowId][colId]) {
      return;
    }

    if (isBlack) {
      nextSquares[rowId][colId] = constant.PLAYER1;
    } else {
      nextSquares[rowId][colId] = constant.PLAYER2;
    }

    setSquares(nextSquares);
    setIsBlack(!isBlack);

    calWinner(rowId, colId);
  };

  const handleRestart = () => {
    setSquares(new Array(constant.CHECKERBOARD_HEIGHT).fill(null).map(() => new Array(constant.CHECKERBOARD_WIDTH).fill(null)));
    setIsBlack(true);
    setWinner(null);
    setIsGameEnd(false);
  };

  for (let i = 0; i < constant.CHECKERBOARD_HEIGHT; i++) {
    checkerboard.push(<CheckerboardLine key={i} squares={squares[i]} onDropChess={(colId) => handleDrop(colId, i)} />);
  }

  return (
    <div className="checkerboard">
      <div>{ checkerboard }</div>
      <div className="board">
        <div className="board-info">{ winner }</div>
        <button className="restart" onClick={handleRestart}>{ constant.RESTART }</button>
      </div>
    </div>
  );
}
