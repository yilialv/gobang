import * as constant from '../../constant';
import Grid from '../Grid/index';
import './index.css';

export default function CheckerboardLine({ squares, onDropChess }) {
  const checkerboardLine = [];

  for (let i = 0; i < constant.CHECKERBOARD_WIDTH; i++) {
    checkerboardLine.push(<Grid key={i} squares={squares[i]} onDropChess={() => onDropChess(i)} />);
  }

  return (
    <div className="checkerboardLine">
      { checkerboardLine }
    </div>
  );
}
