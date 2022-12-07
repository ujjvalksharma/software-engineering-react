import React from "react";
import './tuits.css';
import Tuit from "./tuit";
const Tuits = ({tuits = [], isTuitStatPresent=true }) => {
    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map((tuit,index) =>
                  <Tuit key={'tuit-'+index}
                        tuit={tuit} isTuitStatPresent={isTuitStatPresent} />)
            }
          </ul>
        </div>
      );
}

export default Tuits;