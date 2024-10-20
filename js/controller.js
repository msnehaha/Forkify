import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    const query = searchView.getQuery();
    await model.loadSearchResults(query);

    console.log(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults('pizza');
const init = function () {
  recipeView.addHandler(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
