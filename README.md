# RecipeHub – Recipe Website

A modern and responsive recipe website built using **HTML, CSS, and JavaScript**. The website allows users to search for recipes and view detailed recipe information using the **TheMealDB API**.

## Features

*  **Recipe Search** – Search for recipes by entering a dish name.
*  **Recipe Cards** – Display recipes with images, names, and other information.
*  **View Recipe** – View detailed recipe instructions and ingredients.
*  **Responsive Design** – Works smoothly on desktop, tablet, and mobile devices.
*  **Dynamic Content** – Recipes are fetched and displayed dynamically using JavaScript.
*  **API Integration** – Uses TheMealDB API to retrieve recipe data.
*  **Modern UI** – Clean and user-friendly interface.

## Technologies Used

* **HTML5** – Structure of the website
* **CSS3** – Styling, layout, and responsive design
* **JavaScript** – Functionality and dynamic content
* **Fetch API** – Fetching recipe data
* **TheMealDB API** – Recipe database and information

## API Used

This project uses the **TheMealDB API**:

`https://www.themealdb.com/api/json/v1/1/search.php?s={recipe_name}`

Example:

```javascript
const response = await fetch(
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
);

const data = await response.json();
```

## Project Structure

```text
RecipeHub/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Clone or download this repository.

2. Open the project folder.

3. Open `index.html` in your browser.

4. Enter a recipe name in the search bar.

5. Click the search button to view available recipes.

6. Click **View Recipe** to see the recipe details.

## How It Works

1. The user enters a recipe name in the search bar.
2. JavaScript sends a request to the TheMealDB API.
3. The API returns recipe information in JSON format.
4. JavaScript processes the response.
5. Recipe cards are dynamically generated on the webpage.
6. Users can click **View Recipe** to see the ingredients and cooking instructions.

## Project Preview

Add a screenshot or GIF of your website here:

```markdown
![RecipeHub Preview](./preview.png)
```

## Future Improvements

* Add recipe categories and filters.
* Add a favorites/bookmark feature.
* Add dark mode.
* Add cooking time and difficulty information.
* Add pagination or load-more functionality.
* Improve recipe details with nutritional information.

## Author

Yuvraj Singh

Frontend Developer | Currently Learning Full-Stack Development

---

If you like this project, consider giving the repository a star!
