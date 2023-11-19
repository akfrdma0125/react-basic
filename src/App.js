import React, {useReducer, useState} from 'react';

export default function App() {
  //dispatch -> reducer -> action (기존은 바로 action)
  //dispatch: 청구 직원
  //1st parameter: reducer, 2nd param: inital value
  const [count, countDispatch] = useReducer(countReducer, 0);
  const [number, setNumber] = useState(1);

  //reducer: 장부를 기록하는 회계 직원
  function countReducer(oldCount, action){
    if (action.type === 'UP') {
      return oldCount + action.number;
    } else if (action.type === 'DOWN'){
      return oldCount - action.number;
    } else if (action.type === 'RESET') {
      return 0;
    }
  }

  function down(){
    countDispatch({type: 'DOWN', number: number});
  }


  function reset(){
    countDispatch({type: 'RESET', number: number});
  }


  function up(){
    countDispatch({type: 'UP', number: number});
  }
  
  function changeNumber(event){
    setNumber(Number(event.target.value));
  }

  return(
    <div>
      <input type='button' value="-" onClick={down}/>
      <input type='button' value="0" onClick={reset}/>
      <input type='button' value="+" onClick={up}/>
      <input type='text' value={number} onChange={changeNumber}/>
      <span>{count}</span>
    </div>
  )
}
