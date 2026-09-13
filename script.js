const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const recipeGrid = document.getElementById("recipeGrid");
const recipe = document.getElementById("recipe-box");

// Fetch Recipes

async function searchRecipes(input) {
  try {
    recipeGrid.innerHTML = `
            <div class="loading">
                <div class="loader"></div>
                <p>Finding delicious recipes...</p>
            </div>
        `;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(input)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    if (!data.meals) {
      recipeGrid.innerHTML = `
                <div class="no-results">
                    <div>🍽️</div>
                    <h3>No recipes found</h3>
                    <p>
                        Try searching for something else,
                        such as chicken, pasta, pizza or cake.
                    </p>
                </div>
            `;

      return;
    }

    displayRecipes(data.meals);
  } catch (error) {
    console.error("Error:", error);

    recipeGrid.innerHTML = `
            <div class="no-results">
                <div>⚠️</div>
                <h3>Something went wrong</h3>
                <p>Please check your internet connection and try again.</p>
            </div>
        `;
  }
}

// Display Recipes

function displayRecipes(meals) {
  recipeGrid.innerHTML = "";

  meals.forEach((meal) => {
    const card = document.createElement("article");

    card.classList.add("recipe-card");

    card.innerHTML = `
            <div class="recipe-image">

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                    loading="lazy"
                >

                <span class="recipe-badge">
                    ${meal.strCategory || "Recipe"}
                </span>

            </div>

            <div class="recipe-content">

                <h3>${meal.strMeal}</h3>

                <p>
                    A delicious ${meal.strCategory || "recipe"}
                    from ${meal.strArea || "around the world"}.
                </p>

                <div class="recipe-info">
                    <span>🌍 ${meal.strArea || "International"}</span>
                    <span>● ${meal.strCategory || "Food"}</span>
                </div>

                <a
                    href="#"
                    class="recipe-btn"
                    onclick="showRecipe('${meal.idMeal}'); return false;"
                >
                    <button class="recipe-box-btn">View Recipe →</button>
                </a>

            </div>
        `;

    recipeGrid.appendChild(card);
  });
}

// View Recipe

async function showRecipe(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );

    const data = await response.json();

    if (!data.meals) return;

    const meal = data.meals[0];

    // Get ingredients
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`
          <li>
            ${measure ? measure.trim() : ""} ${ingredient.trim()}
          </li>
        `);
      }
    }

    // Format instructions
    const instructions = meal.strInstructions
      ? meal.strInstructions
          .split(/\d+\.\s+/)
          .filter((step) => step.trim() !== "")
      : [];

    const instructionHTML = instructions.length
      ? instructions
          .map(
            (step, index) => `
              <li>
                <span>${step.trim()}</span>
              </li>
            `,
          )
          .join("")
      : "<li>Instructions are not available.</li>";

    // Show recipe
    recipe.style.display = "block";

    recipe.innerHTML = `
      <div class="recipe-header">
        <b>${meal.strMeal}</b>
        <img 
          src="icons/cross.svg" 
          alt="Close recipe" 
          class="cross-btn"
        >
      </div>

      <img 
        src="${meal.strMealThumb}" 
        alt="${meal.strMeal}"
        class="recipe-detail-image"
      >

      <ul class="recipe-details">
        <li><b>Category:</b> ${meal.strCategory || "N/A"}</li>
        <li><b>Cuisine:</b> ${meal.strArea || "N/A"}</li>
      </ul>

      <h3>Ingredients</h3>

      <ul class="ingredients">
        ${ingredients.join("")}
      </ul>

      <h3>Instructions</h3>

      <ol class="instructions">
        ${instructionHTML}
      </ol>
    `;

    // Close recipe
    document.querySelector(".cross-btn").addEventListener("click", () => {
      recipe.style.display = "none";
    });

  } catch (error) {
    console.error("Error:", error);
    alert("Unable to load this recipe. Please try again.");
  }
}

// Search Form

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = searchInput.value.trim();

  if (input === "") {
    searchRecipes("chicken");

    return;
  }

  searchRecipes(input);
});


// Load Default Recipes

searchRecipes('chicken');
