import React from 'react';
import './App.scss';
import AppHeader from "./components/Header";
import Category from "./modules/Category";
import { Routes, Route, useParams  } from 'react-router-dom';
import {getCategories} from "./GQL";

class App extends React.Component<{}, {selectedCategory: string, selectedCurrency: string}> {

  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = { selectedCategory: "", selectedCurrency: "USD"};
    this.callback = this.callback.bind(this);
    this.currencyCallback = this.currencyCallback.bind(this);
  }

  // setSelectedCategory(category: string) {
  //   this.setState({selectedCategory: category})
  // }
  callback(payload: any){
    this.setState({selectedCategory: payload})

  }
  currencyCallback(payload: any){
    console.log(payload, "payload")
    this.setState({selectedCurrency: payload})

  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <AppHeader
          selectedCategory={this.state.selectedCategory}
          callback={this.callback}
          currencyCallback={this.currencyCallback}
          selectedCurrency={this.state.selectedCurrency}
        />
        <Routes>
          <Route path="/:categoryName" element={<Category selectedCurrency={this.state.selectedCurrency} selectedCategory={this.state.selectedCategory}/>}/>
        </Routes>

      </div>
    );
  }
}

export default App;
