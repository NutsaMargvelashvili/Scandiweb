import React from 'react';
import './App.scss';
import AppHeader from "./components/Header";
import Category from "./modules/Category";
import { Routes, Route, useParams  } from 'react-router-dom';
import {getCategories} from "./GQL";

class App extends React.Component<{}, {selectedCategory: string}> {

  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = { selectedCategory: ""};
    this.callback = this.callback.bind(this);
  }

  // setSelectedCategory(category: string) {
  //   this.setState({selectedCategory: category})
  // }
  callback(payload: any){
    console.log(payload, "payload")
    this.setState({selectedCategory: payload})

  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <AppHeader
          selectedCategory={this.state.selectedCategory}
          callback={this.callback}
        />
        <Routes>
          <Route path="/:categoryName" element={<Category selectedCategory={this.state.selectedCategory}/>}/>
        </Routes>

      </div>
    );
  }
}

export default App;
