import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json().then((users) => {
        this.setState(() => {
          return { monsters: users };
        });
      })
    );
  }

  onSearchingChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchingChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className='App'>
        <h1 className='app-title'>The list of mosters</h1>
        <SearchBox
          onChangeHandler={onSearchingChange}
          placeholder='search monsters'
          className='monsters-search-box'
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
