# Watch CLI

**Watch CLI** is a cross-platform command-line tool that allows you to quickly search for movies or TV series, generate a local HTML page with an embedded video player, and open it in your browser. It supports specifying seasons and episodes for TV series and works seamlessly on **Windows, macOS, and Linux**.

---

## Features

- Search for movies or TV series by title using the TMDB API
- Automatically open the HTML in your default browser
- Cross-platform support
- Securely manage API keys with environment variables

---

## Installation

Clone the repository and install globally with npm:
```bash
git clone https://github.com/your-username/watch-cli.git
cd watch-cli
npm install -g .
```
---

## Setup

1. Get a **TMDB API key** from [TMDB](https://www.themoviedb.org/).
2. Store your API key in an environment variable:

Windows (PowerShell):
```Bash
setx API_KEY "your_tmdb_api_key_here"
```
macOS/Linux (bash/zsh):
```Bash
export API_KEY="your_tmdb_api_key_here"
```
Alternatively, create a .env file in the project folder:
API_KEY=your_tmdb_api_key_here

---

## Usage

### Movies

watch --movie Movie_Title
eg: watch --movie Inception
This will:
- Search for the movie "Inception"
- Generate a local watch.html file with an embedded video
- Open the HTML in your default browser

### TV Series
watch --series Series_Title Season Episode
eg: watch --series Breaking Bad 1 2

Where 1 is the **season number** and 2 is the **episode number**. This will:
- Search for the series
- Generate an HTML page with an iframe for the specific season and episode
- Open it in your browser

---

## Notes

- Make sure your API key is set correctly in the environment; otherwise, the CLI will not find any movies or series.
- The generated watch.html file can be reopened anytime without rerunning the CLI.
- Fully compatible with Windows, macOS, and Linux.

---
