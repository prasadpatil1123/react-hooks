import React, { Component, useState, useEffect } from "react";

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);


  // fetch news
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
      .then((result) => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]); // Add an empty dependency array to run useEffect only once on mount

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  };

  const showLoading = () => ( loading?<h2> Loading...</h2> : ""
);

const searchForm = () => (
  <form onSubmit={handleSubmit}>
    <input type="text" value={searchQuery} onChange={handleChange} />
    <button>search</button>
  </form>
)

const showNews = () => (
  news.length === 0 ? (
    <p>Loading...</p>
  ) : (
    news.map((n, i) => (
      <p key={i}>{n.title}</p>
    ))
  )
);

return (
  <div>
    <h2>News</h2>
    {showLoading()}
    {searchForm()}
    {showNews()}
  </div>
);
};
// const App = () =>{
//   const[count, setCount] = useState(0);

// useEffect(() =>{
// document.title = `Clicked ${count} times`
// });
//   const increment = () => {
//     setCount(count +1);
//   };

//   return(
//     <div>
//       <h2>Count App</h2>
//       <button onClick={increment}>
//         Clicked {count} times
//       </button>
//     </div>
//   );
// }


// class App extends Component{
//   state ={
//     count:0
//   };
//   increment = () => {
//     this.setState({
//       count:this.state.count + 1
//     });
//   };

//   componentDidMount(){
//     document.title = `Clicked ${this.state.count} times`
//   }
//   componentDidUpdate(){
//     document.title = `Clicked ${this.state.count} times`
//   }
//   render(){
//     return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={this.increment}>
//         Clicked {this.state.count} times
//       </button>
//     </div>
//     );
//   }
// }

export default App;