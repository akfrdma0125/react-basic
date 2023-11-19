import React, {createContext, useContext} from 'react';
import './style.css';

const themeDefault = {border: '10px solid red'}
const themeContext = createContext(themeDefault); //context의 default값
//이점: enum클래스 같은 전역 적용

export default function App() {
  const theme = useContext(themeContext); 
  console.log(theme); //themeDefault 값 리턴
  return (
    <themeContext.Provider value={{border: '10px solid blue'}}>
      <div className='root' style={theme}>
        <h1>Hello World!</h1>
        <Sub1 />
      </div>
    </themeContext.Provider>
  );

  function Sub1(){
    const theme = useContext(themeContext);
    return(
      <themeContext.Provider value = {{border: '10px solid green'}}>
        <div style={theme}>
          <h1>Sub1</h1>
          <Sub2/>
        </div>
      </themeContext.Provider>
    )
  }

  function Sub2(){
    const theme = useContext(themeContext);
    return(
      <div style={theme}>
        <h1>Sub2</h1>
        <Sub3/>
      </div>
    )
  }

  function Sub3(){
    const theme = useContext(themeContext);
    return(
      <div style={theme}>
        <h1>Sub3</h1>
      </div>
    )
  }
}
