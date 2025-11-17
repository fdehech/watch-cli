#!/usr/bin/env node

import 'dotenv/config';
import fetch from 'node-fetch';
import open from 'open';
import { exec } from 'child_process';
import os from 'os';

// --- argv parsing ---
const args = process.argv.slice(2);

if (args.length < 2) {
    console.error("Error: Please provide type and title.");
    console.log("Usage:");
    console.log("  watch --movie <title>");
    console.log("  watch --series <title> <season> <episode>");
    process.exit(1);
}

// Determine type
const typeFlag = args[0];
let type;
if (typeFlag === "--movie") type = "movie";
else if (typeFlag === "--series") type = "series";
else {
    console.error("Error: First argument must be --movie or --series");
    console.log("Usage: watch --movie <title> OR watch --series <title> <season> <episode>");
    process.exit(1);
}

// Extract title
let title;
let season, episode;

if (type === "movie") {
    title = args.slice(1).join(" ").trim();
    if (!title) {
        console.error("Error: Please provide a valid movie title.");
        process.exit(1);
    }
} else if (type === "series") {
    if (args.length < 4) {
        console.error("Error: For series, you must provide title, season, and episode.");
        console.log("Usage: watch --series <title> <season> <episode>");
        process.exit(1);
    }
    title = args.slice(1, -2).join(" ").trim();
    season = args[args.length - 2];
    episode = args[args.length - 1];
}

// --- fetch options ---
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`
    }
};

function openBrowser(url) {
    const platform = os.platform();

    if (platform === 'win32') {
        // Windows
        exec(`start "" "${url}"`);
    } else if (platform === 'darwin') {
        // macOS
        exec(`open "${url}"`);
    } else {
        // Linux
        exec(`xdg-open "${url}"`);
    }
}

// --- fetch content from TMDB ---
async function fetchContent(type, title) {

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            console.error(`No ${type} found for title "${title}"`);
            process.exit(1);
        }

        return data.results[0].id; // return first match ID
    } catch (error) {
        console.error("Error fetching data:", error);
        process.exit(1);
    }
}
// --- main execution ---
(async () => {
    const Target_ID = await fetchContent(type, title);

    let watch_url;
    if (type === "movie") {
        watch_url = `https://www.vidking.net/embed/movie/${Target_ID}`;
        console.log(`Opening Movie: ${title}`);
    } else {
        watch_url = `https://www.vidking.net/embed/tv/${Target_ID}/${season}/${episode}`;
        console.log(`Opening Series: ${title} (Season ${season}, Episode ${episode})`);
    }

    await openBrowser(watch_url);
})();
