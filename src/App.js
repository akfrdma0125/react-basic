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
    // <ul> : 순사가 없는 html list 표현, 마찬가지로 <li> 와 함께 사용됨.
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
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }
      }>
        <p><input type='text' name='title' placeholder='title'/> </p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value="Create"></input></p>
      </form>
    </article>
  )
}

//update 하려면 꼭! props가 아니라 state 설정해야 함!!!
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={
        event => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }
      }>
        <p><input type='text' name='title' placeholder='title' value={title} onChange={
          event => {
            setTitle(event.target.value); //이벤트마다 컴포넌트 다시 랜더링
          }
        }/> </p>
        <p><textarea name='body' placeholder='body' value={body} onChange={
          event => {
            setBody(event.target.value);
          }
        }></textarea></p>
        <p><input type='submit' value="Update"></input></p>
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
  let contextControl = null;
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
    contextControl = <>
      <li><a href={'/update/'+id} onClick={
        event => {
          event.preventDefault();
          setMode('UPDATE');
        }
      }>Update</a></li>
      <li><input type='button' value='Delete' onClick={
        () => {
          const newTopics = []
          for(let i=0; i<topics.length; i++) {
            if(topics[i].id !== id) {
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics);
          setMode('WELCOME');
        }
      }/></li>
    </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={
      (_title, _body) => {
        const newTopic = {id: nextId, title: _title, body: _body}
        const newTopics = [...topics] //데이터 복제
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);
      }
    }/>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for (let idx = 0; idx < topics.length; idx++) {
      if (topics[idx].id === id) {
        title = topics[idx].title;
        body = topics[idx].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={
      (title, body) => {
        console.log(title, body);
        const newTopics = [...topics];
        const updatedTopic = {id: id, title: title, body: body} //id는 state
        for (let i = 0; i < newTopics.length; i++) {
          if (newTopics[i].id === id) {
            newTopics[i] = updatedTopic;
            break;
          }
        }
        setTopics(newTopics);
        setMode('READ');
      }
    } ></Update>
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
      <ul>
        <li>
          <a href='/create' onClick={
          event => {
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
      </ul>
      {contextControl}
    </div>
  );
}

export default App;
