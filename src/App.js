import React, { Component } from "react";
import "./App.css";
import { recipes } from "./tempList";
import RecipeList from "./Components/RecipeList";
import RecipeDetails from "./Components/RecipeDetails";
import RecipeSearch from "./Components/RecipeSearch";
class App extends Component {
  state = {
    recipes: recipes,
    base_url:
      "https://www.food2fork.com/api/search?key=8d2045d526a4a0f2dd70efdbf600b111",
    url:
      "https://www.food2fork.com/api/search?key=8d2045d526a4a0f2dd70efdbf600b111",
    pageIndex: 1,
    details_id: 35382,
    search: "",
    query: "&q=",
    error: ""
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();

      if (jsonData.count === 0) {
        this.setState(() => {
          return { error: "sorry but your search did not return any results" };
        });
      } else {
        this.setState(() => {
          return { recipes: jsonData.recipes, error: "" };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    //this.getRecipes();
  }

  displayPage = index => {
    switch (index) {
      case 1:
        return (
          <RecipeList
            handleDetails={this.handleDetails}
            recipes={this.state.recipes}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.error}
          />
        );

      case 0:
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
      default:
        return {};
    }
  };

  handleDetails = (index, id) => {
    console.log(id);
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  handleIndex = index => {
    this.setState({
      pageIndex: index
    });
  };

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(
      {
        url: `${this.state.base_url}${this.state.query}${this.state.search}`,
        search: ""
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}

export default App;
