import './style.css';
import React,{useState} from 'react';
import {createStore} from 'redux';
import {Provider, useSelector, useDispatch} from 'react-redux';

//state를 복제해서, 컴포넌트마다 값을 유지하게 함
//실제로 변경되는 컴포넌트만 랜더링함
function reducer(currentState, action)
{
  if (currentState === undefined) {
    return{
      number: 1,
    };
  }
  const newState = {...currentState};
  if(action.type === 'PLUS'){
    newState.number++;
  }
  return newState;
}
//자식에게 props, 속성을 상속할 때, 계~~~속 줄 수는 없음 -> redux
const store = createStore(reducer);

function App() {
  return (
    <div id='container'>
      <h1>Root</h1>
      <div id='grid'>
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

function Left1(props){
  return(
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  )
}

function Left2(props){
  console.log('Left2');
  return(
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  )
}

function Left3(props){
  console.log('Left3');
  const number = useSelector((state) => state.number);
  return(
    <div>
      <h1>Left3: {number}</h1>
    </div>
  )
}

function Right1(props){
  return(
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  )
}

function Right2(props){
  return(
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  )
}

function Right3(props){
  const dispatch = useDispatch();
  return(
    <div>
      <h1>Right3</h1>
      <input
        type='button'
        value='+'
        onClick={() => {
          dispatch({type: 'PLUS'}); 
          //dispatch: reducer 호출하는 메서드
        }}/>
    </div>
  )
}

export default App;
