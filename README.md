# Recommendations - Project Setup Guide
This guide will help you set up and configure the recommendation widget project. Follow these steps to get started.

### 1: Set Up the Project

1. Clone the project repository to your local machine.
2. Change your working directory to the project folder.
3. Ensure that you have Node.js and npm (Node Package Manager) installed on your system.
4. Install project dependencies using the following command:

```
npm install
```

### 2: Ensure USA VPN for Taboola API Access

Make sure to enable a USA VPN because the Taboola API requires it for access.

### 3: Modify the Custom Configuration

Open the `custom-config.js` file located in your project directory. This file contains your custom configuration options, including the API key.

```javascript
// custom-config.js

// Customize the recommendation widget configuration below:
export const customConfig = {
  // title: // Title displayed above the recommendations (default: 'More for You'),
  // isGetNewRecBtnVisible: // Show button for loading different topics (if true) (default: true)
  // isVisibleIfNoImg: // Show card when the image is available (if true), hide when no image (default: false)
  // Add other custom configuration options as needed
};

export const customQueryParams = {
  "app.apikey": "YOUR_API_KEY_HERE", // Replace this with the API key provided to you
  // count: // Specify the number of recommendations to display; may be limited by the widget (default: 10)
  // Add other query parameters as needed
};

// Add any other custom configuration or parameters here
```

Make sure to replace "YOUR_API_KEY_HERE" with the actual API key provided to you for the Taboola API. This will ensure that your widget functions correctly with the API.

### 4: Open the Project in a Browser

Open the `index.html` file in a web browser. The recommendation widget should be displayed.

### 5: Embed the Widget in Another Website

To embed the recommendation widget in another website, you have the flexibility to modify the HTML of the target website. Here's an example of how you can modify the HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <title>News Website</title>
  </head>
  <body>
    <header>
      <h1>News Website</h1>
    </header>
    <main>
      <article>
        <h2>Breaking News: Exciting Developments!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </article>
    </main>
    <footer>
      <!-- Recommendation widget embedded here -->
      <div id="widget-container">
        <div id="recommendation-widget" class="recommendations-container"></div>
        <script type="module">
          import { renderRecommendations } from "./script.js";
          import {
            customConfig,
            customQueryParams,
          } from "./config/custom-config.js";
          renderRecommendations(
            "recommendation-widget",
            customConfig,
            customQueryParams
          );
        </script>
      </div>
    </footer>
  </body>
</html>
```

In this example, a new `<div>` with the id "widget-container" was added to the target website's HTML. The widget is placed inside this container. You can customize the positioning and styling of the "widget-container" to fit the design of the target website.
