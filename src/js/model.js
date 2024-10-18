// import { get } from 'core-js/core/dict';
import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './views/helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(res, data);
    // console.log(state.recipe);
  } catch (err) {
    //Temp Error Handling
    console.error(`${err} `);
  }
};
