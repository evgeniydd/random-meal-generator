const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
      createMeal(res.meals[0]);
    });
});

const createMeal = meal => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const newInnerHTML = `
<div class="rows">
<div class="columns left-side">
  <h2 class="meal-title">${meal.strMeal}</h2>
  <img
    src="${meal.strMealThumb}"
    alt="Meal Image"
  />

${
  meal.strCategory
    ? `<p class="category"><span>Category: </span>${meal.strCategory}</p>`
    : ''
}
${meal.strArea ? `<p class="area"><span>Area: </span>${meal.strArea}</p>` : ''}

 
  <h3 class="ingredients-title">Ingredients:</h3>
     <ul class="ingredients">
    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
  </ul>
</div>

<div class="columns information">
 
  <p>${meal.strInstructions}</p>
</div>
</div>

${
  meal.strYoutube
    ? `
<div class="row video">
<h3 class="video">Video Recipe</h3>
<div class="video-wrapper">
  <iframe
    width="420"
    height="315"
    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
  ></iframe>
</div>
</div>


`
    : ''
}


`;

  meal_container.innerHTML = newInnerHTML;
};
