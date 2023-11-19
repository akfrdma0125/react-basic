import logo from './logo.svg';
import './App.css';

function Header(props){
  console.log('props', props.title)
  return(
    <header>
      <h1><a href='/'>{props.title}</a></h1>
    </header>
  )
}

function Nav(props){
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>);
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

function App() {
  const topics = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'javascript', body: 'javascript is ...'}
  ]
  return (
    <div>
      <Header title="REACT"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
      <Article title="Bye" body="Bye, Web"></Article>
    </div>
  );
}

export default App;
