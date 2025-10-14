# BentoRoll

<p align="center">
  <img src="https://i.ibb.co/pjJPbymj/image.png" alt="BentoRoll Logo" width="150" />
  <img src="https://i.ibb.co/9HQ8GPYv/image.png" alt="BentoRoll Mascot" width="150" />
</p>

**BentoRoll** is a lightweight, static website designed to serve as an anime backup and episode index. Hosted on GitHub Pages, it allows users to browse and access anime episodes through direct links, ensuring a reliable and organized archive.

## 📂 Project Structure

The repository is organized as follows:

```
bentoroll.github.io/
├── api/              # Backend API scripts (if any)
├── data/             # JSON/CSV files containing anime metadata
├── src/              # JavaScript source files
├── index.html        # Homepage listing all anime series
├── series.html       # Template for individual series pages
├── watch.html        # Template for episode watch pages
├── style.css         # Global styles
└── README.md         # Project documentation
```

## 🌐 Live Demo

Explore the live version of BentoRoll at: [https://bentoroll.vercel.app](https://bentoroll.vercel.app)

## 🛠️ Features

* **Browse Anime**: View a list of available anime series.
* **Episode Index**: Access episodes through direct links.
* **Responsive Design**: Optimized for both desktop and mobile devices.
* **Minimalist Interface**: Focused on functionality with a clean layout.

## 🚀 Getting Started

To run BentoRoll locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Vystelior/bentoroll.github.io.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bentoroll.github.io
   ```

3. Open `index.html` in your preferred browser.

No additional setup is required; the site is entirely static.

## 📁 Data Structure

The `data/` directory contains JSON or CSV files with metadata for each anime series. Each file should include:

```json
{
  "series": "Naruto",
  "episodes": [
    {
      "episode": 1,
      "title": "Enter: Naruto Uzumaki!",
      "link": "https://drive.google.com/...",
      "cover": "https://..."
    }
  ]
}
```

This structure allows for easy addition of new series and episodes.

## 🧪 Development Notes

* **HTML**: Utilizes semantic tags for better accessibility.
* **CSS**: Written in plain CSS; consider using preprocessors like SASS for larger projects.
* **JavaScript**: Functions are modular; consider using ES6 modules for better maintainability.

## 📌 Future Enhancements

* Implement search and filtering capabilities.
* Add a "Continue Watching" feature using browser storage.
* Integrate a backend API for dynamic content management.
* Enhance mobile responsiveness and performance.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push to your fork.
5. Open a pull request detailing your changes.

Please ensure that your code adheres to the existing style and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
