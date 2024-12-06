# AnimeStream - A Responsive Anime Streaming Platform

**AnimeStream** is a fully responsive anime streaming platform built with React.js, React Router, Bootstrap, and Axios, providing users with detailed anime information, episode listings, and search functionality. The site allows users to explore anime by genre, access detailed pages, watch trailers, and manage their watchlist. The platform also features a dynamic dark/light mode toggle for a seamless user experience.

---

## Features

- **Responsive Design**: Works on all screen sizes, from desktops to mobile devices.
- **Anime Detail Pages**: Displays detailed anime information such as title, score, genres, producers, and episodes.
- **Anime Search**: Users can search for their favorite anime by name.
- **Genre Listings**: Explore anime by genres with a hover-based genre navigation.
- **Dark/Light Mode**: Switch between dark and light modes for a personalized experience.
- **Retry Logic for API**: Implements retry logic to handle API rate limits and ensure smooth functionality.
- **Anime Watchlist**: Add anime to your watchlist (UI for future functionality).
- **Trending, Popular, and Ongoing Anime**: Display trending, popular, and ongoing anime titles with pagination.

---

## Tech Stack

- **Frontend**:
  - React.js
  - React Router
  - Bootstrap 5
  - Axios
  - React Context API (for theme management)
  - Jikan API (anime data source)

- **Features**:
  - Responsive layout with Flexbox/Grid
  - Dark/Light mode
  - Retry logic to handle API rate limiting
  - Search functionality
  - Genre listing and filtering
  
---

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/anime-stream.git
    ```

2. **Navigate to the project folder**:
    ```bash
    cd anime-stream
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the app**:
    ```bash
    npm start
    ```

5. Open your browser and visit `http://localhost:3000` to see the app in action.

---

## How to Use

1. **Browse Anime**: On the homepage, you'll find a list of trending, popular, and ongoing anime.
2. **Search**: Use the search bar to search for any anime by title.
3. **Explore Genres**: Hover over the "Genres" tab in the navigation bar to see the genre list. Click on a genre to view anime related to that genre.
4. **Dark/Light Mode**: Toggle between dark and light themes using the theme switch button in the navbar.

---

## Screenshots

#### Homepage
![Home Screenshot](screenshots/home.png)

#### Anime Detail Page
![Anime Detail Screenshot](screenshots/anime-detail.png)

#### Search Functionality
![Search Screenshot](screenshots/search.png)

---

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Jikan API](https://jikan.moe) for anime data.
- [React.js](https://reactjs.org) for building the user interface.
- [Bootstrap 5](https://getbootstrap.com) for responsive design.
- [Axios](https://axios-http.com) for making API calls.
- [React Context API](https://reactjs.org/docs/context.html) for managing theme state.

---

## Contact

Feel free to reach out if you have any questions or suggestions:

- **Email**: your-email@example.com
- **GitHub**: [Your GitHub](https://github.com/yourusername)

---

Thank you for checking out AnimeStream! 🎉
