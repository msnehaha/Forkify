import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    recipeView.renderSpinner();
    //1) Loading Recipe

    const id = window.location.hash.slice(1);
    if (!id) return;

    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2)Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderMessage("We couldn't find the recipe you're looking for!");
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) Get Search Query
    const query = searchView.getQuery();
    // console.log(query);

    //2)Load Search Results
    await model.loadSearchResults(query);
    console
      .log
      // 'Search Results' + resultsView.render(model.getSearchResultsPage(1))
      ();
    resultsView.render(model.getSearchResultsPage());
    // console.log(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
// controlSearchResults('pizza');
const init = function () {
  recipeView.addHandler(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
