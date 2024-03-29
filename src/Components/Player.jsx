import { useState } from "react"

export default function Player({ initialName, symbol, isActive}){
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        // setIsEditing(isEditing ? false : true);
        setIsEditing((editing) => !editing);
    }

    function handleChange(e){
        setPlayerName(e.target.value)
    }
    return(
        <li className={isActive ? 'active' : ''}>
        <span className="player">
        {isEditing ?  <input type="text" value={playerName} onChange={handleChange} required/> : <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    )

}