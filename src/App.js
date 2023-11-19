import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  console.log('props', props.title)
  return(
    <header>
      <h1><a href='/' onClick={(event) => {
        //event : 상황을 제어할 수 있는 여러 가지 정보와 기능 포함
        event.preventDefault(); //기본 동작: 새로 고침
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props){
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id = {t.id} href={'/read/'+t.id} onClick={
      event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); //여기서 event.target 은 a 태그, 이벤트를 호출한 태그
      }
    }>{t.title}</a></li>);
    // 반복문 내에서 추적할 수 있게 key 라는 고유한 값을 갖는 props가 필요함
  }
  return(
    // <nav> : 다른 페이지 또는 현재 페이지의 다른 부분과 연결되는 네비게이션 링크(navigation links)들의 집합
    // <ol> : 순서가 있는 html list 표현, 대개 <li> 와 함께 사용됨. 기본값은 1/2/3 ... (지정 가능)
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props){
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Create(props){
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={
        event => {
          event.preventDefault();
          const title = event.target.titile.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }
      }>
        <p><input type='text' name='title' placeholder='title'/> </p>
        {/* placeholder === Android hint 
            p === \n */}
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value="Create"></input></p>
      </form>
    </article>
  )
}

/*
state
state 값이 변화하고, App() 함수가 재실행될 때, 리턴 값이 변화하게 됨! -> 동적인 값을 리턴하고 싶을 때!
useState 자료형은 크기가 2인 배열, 0번째 원소: 데이터, 1번째 원소: 함수

state의 데이터 자료형이 primitive라면 그냥 하면 되지만!
범 객체 타입이라면 (ex. array, object ... ) 데이터를 복제하고 다시 넣어줘야 함
*/

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'javascript', body: 'javascript is ...'}
  ]);
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === 'READ'){
    let title, body = null;
    for (let idx = 0; idx < topics.length; idx++) {
      if (topics[idx].id === id) {
        title = topics[idx].title;
        body = topics[idx].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={
      (_title, _body) => {
        const newTopic = {id: nextId, title: _title, body: _body}
        const newTopics = {...topics} //데이터 복제
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);
      }
    }/>
  }
  return (
    <div>
      <Header title="REACT" onChangeMode={
        () => {
          setMode('WELCOME');
        }
        //onChangeMode라는 props 값으로 함수를 전달
      }></Header>
      <Nav topics={topics} onChangeMode={
        (_id) => {
          setMode('READ');
          setId(_id);
        }
      }></Nav>
      {content}
      <a href='/create' onClick={
        event => {
          event.preventDefault();
          setMode('CREATE');
        }
      }>Create</a>
    </div>
  );
}

export default App;
