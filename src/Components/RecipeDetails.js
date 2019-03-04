import React, { Component } from "react";
import { recipe } from "../tempDetails";

export default class sRecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: recipe,
      url: `https://www.food2fork.com/api/get?key=8d2045d526a4a0f2dd70efdbf600b111&rId=${
        this.props.id
      }`
    };
  }
  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();

      this.setState({
        recipe: jsonData.recipe
      });
    } catch (error) {
      console.error();
    }
  }

  componentWillMount() {
    this.getRecipes();
  }
  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    const { handleIndex } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <button
                type="button"
                className="btn btn-warning mb-5 text-capitalize"
                onClick={() => handleIndex(0)}
              >
                back to recipe list
              </button>
              <img src={image_url} alt="nothing" className="d-block w-100" />
            </div>
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase"> {title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">
                Provide by {publisher}
                {title}
              </h6>

              <a
                href={publisher_url}
                target="_blank"
                className="btn btn-primary mt-2 text-capitalize"
                rel="noopener noreferrer"
              >
                Publisher Webpage
              </a>

              <a
                href={source_url}
                target="_blank"
                className="btn btn-success mt-2 mx-3 text-capitalize"
                rel="noopener noreferrer"
              >
                Recipe Url{" "}
              </a>
              <ul className="list-group mt-4">
                <h4 className="mt-3 mb-4 text-capitalize">ingredients</h4>
                {ingredients.map((item, index) => {
                  return (
                    <li key={index} className="list-group-item tet-slanted">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
