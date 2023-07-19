import './index.css';
import { PLAYER1 } from '../../constant';

export default function Grid({ squares, onDropChess }) {
  return (
    <div className={squares ? (squares === PLAYER1 ? 'chosen-black-grid grid' : 'chosen-white-grid grid') : 'grid'} onClick={onDropChess}>
      <div className="line">
        <div className="square square-up-left" />
        <div className="square square-up-right" />
      </div>
      <div className="line">
        <div className="square square-bottom-left" />
        <div className="square" />
      </div>
    </div>
  );
}
