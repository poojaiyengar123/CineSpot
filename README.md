# CineSpot 🎥

**CineSpot** is a dynamic and user-friendly app that allows users to search for movie/show titles, filter by release year, and explore detailed information about their favorite titles. Powered by the OMDb REST API, CineSpot provides a smooth and intuitive experience for users to discover and learn about movies, TV shows, and more. 

## Features 

### 1. Search and Filter
* Users can search for a title and filter their search results by the release year.
* The application fetches data from the OMDb REST API based on the user's query. 

### 2. Interactive Gallery View
* Search results are displayed as **gallery cards**, showcasing key details:
  * Title
  * Poster
  * Release Year
  * Type (e.g., movie, series)
* Users can click through results one at a time.

### 3. Detailed Information
* Each gallery card provides a **Show More** button to reveal in-depth information, including:
  * Ratings (IMDb, Rotten Tomatoes, etc.)
  * Release Date
  * Runtime
  * Genres
  * Plot
  * Directors, Writers, and Actors
  * Language
  * Awards

## Screenshots

### 1. Landing Page
The landing page of CineSpot features a clean and intuitive search bar where users can enter a title and filter by release year.
    ![CineSpot Landing Page](src/assets/cinespot_landing_page.png)
  
### 2. Display Page
The display page presents the results as clickable gallery cards. Users can view detailed information about a title by clicking the **Show More** button. 
    ![CineSpot Landing Page](src/assets/cinespot_display_page.png)

## Planned Improvements

#### 1. Advanced Search Options
  * Allow users to search by:
    * Actor's Name
    * Director's Name
    * Genre

#### 2. "More Like This" Button
  * Display titles similar to the currently selected movie or TV show

#### 3. Top-Rated Movies by Year
  * Provide an option to browse the highest-rated movies of each year.

#### 4. Browse Tab
  * Let users scroll through the most recent titles added to the OMDb database.

## Technologies Used

* **Frontend Framework**: Vite + React
* **API**: OMDb REST API
* **Languages**: TypeScript, HTML, CSS

## How to Use CineSpot

#### 1. Search for Titles
  * Enter a title into the search bar.
  * Optionally, filter your results by specifying the release year.

#### 2. Explore Results
  * View the search results as clickable gallery cards. 
  * Click the **Show More** button to see detailed information about a title.

#### 3. Navigate Through Results
  * Use navigation controls to explore results one at a time.

## Setup Instructions

Follow these steps to run CineSpot locally:

1. Clone the repository:
        ```git clone https://github.com/poojaiyengar123/CineSpot.git```
        ```cd CineSpot```

2. Install dependencies:
        ```npm install```

3. Start the development server:
        ```npm run dev```

4. Open your browser and navigate to:
        ```http://localhost:5173```
