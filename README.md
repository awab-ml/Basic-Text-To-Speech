# Voice Weaver Pro - Enhanced Text-to-Speech Application

![Voice Weaver Pro Screenshot](YOUR_SCREENSHOT_URL_HERE) 
*(Replace with an actual screenshot URL after deployment or upload)*

**[Live Demo](YOUR_DEMO_LINK_HERE)**
*(Replace with your actual demo URL after deployment)*

## Overview

Voice Weaver Pro is a modern, feature-rich web application that converts text into natural-sounding speech directly in your browser. Built purely with vanilla HTML, CSS, and JavaScript, it leverages the powerful built-in Web Speech API (`SpeechSynthesis`) to provide a seamless and engaging text-to-speech experience.

This project focuses on delivering a premium user experience with a sophisticated dark theme, smooth interactions, and enhanced customization options, making text-to-speech generation intuitive and enjoyable.

## Key Features

*   **Text Input:** Enter custom text into a responsive textarea.
*   **Character Counter & Limit:** Real-time feedback on text length with a predefined maximum limit.
*   **Dynamic Voice Selection:** Choose from a list of available voices installed on your system/browser, automatically populated and sorted, including language indicators (e.g., `en-US`, `ar-SA`).
*   **Adjustable Speech Rate:** Fine-tune the speaking speed using an intuitive range slider (0.5x to 2x).
*   **Adjustable Pitch:** Modify the pitch of the voice using a range slider (0 to 2).
*   **Speak & Stop Controls:** Clear buttons to start and stop speech synthesis.
*   **Visual Speaking Indicator:** Animated feedback on the "Speak" button while audio is playing.
*   **Randomize Settings:** A fun feature to instantly apply random voice, speed, and pitch settings.
*   **Quick Phrases:** Convenient buttons to instantly populate the text area with common phrases (including multi-language examples like Arabic).
*   **Responsive Design:** Fully functional and visually appealing interface across various screen sizes (desktops, tablets, mobiles).
*   **Modern Dark UI:** Aesthetically pleasing dark theme with smooth transitions and effects.
*   **Status/Error Feedback:** Clear messages indicating loading states, successful operations, or errors.
*   **Cross-Browser Compatibility:** Works on modern browsers supporting the Web Speech API (SpeechSynthesis).

## Tech Stack

*   **HTML5:** Semantic structure for content.
*   **CSS3:** Styling, layout (Flexbox, Grid), custom properties (variables), animations, and responsiveness.
*   **Vanilla JavaScript:** Core application logic, DOM manipulation, event handling, and interaction with the **Web Speech API (SpeechSynthesis)**.
*   **No Frameworks/Libraries:** Built entirely from scratch using native browser capabilities.

## Setup and Installation

As this is a purely front-end application using built-in browser APIs, there's no complex build process required.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    ```
    *(Replace with your actual repository URL)*
2.  **Navigate to the directory:**
    ```bash
    cd YOUR_REPOSITORY_NAME
    ```
3.  **Open the application:**
    Simply open the `index.html` file in your favorite modern web browser that supports the Speech Synthesis API (like Chrome, Firefox, Edge, Safari).

    *   *Note:* Some browser security policies might restrict `SpeechSynthesis.getVoices()` when running directly from the local file system (`file:///`). It's often best viewed when served via a simple local web server or after deployment.

## Usage

1.  **Enter Text:** Type or paste the text you want to convert into the main text area. Alternatively, click one of the "Quick Phrase" buttons.
2.  **Select Voice:** Choose a desired voice from the "Voice" dropdown menu. The list depends on the voices installed on your operating system and available to your browser.
3.  **Adjust Speed:** Use the "Speed" slider to control how fast the text is spoken. The current value is displayed next to the label.
4.  **Adjust Pitch:** Use the "Pitch" slider to change the pitch of the selected voice. The current value is displayed.
5.  **Randomize (Optional):** Click the "Randomize" button (dice icon) to instantly select a random voice, speed, and pitch.
6.  **Speak:** Click the "Speak" button. The button will animate and change text while speaking.
7.  **Stop:** If speech is in progress, click the "Stop" button to halt it immediately.
8.  **Status:** Check the status area below the buttons for feedback (e.g., "Loading voices...", "Speaking...", "Error...").

## Deployment

Deploy this application easily to any static web hosting service:

*   **GitHub Pages:** Enable Pages in your repository settings.
*   **Netlify:** Drag and drop the project folder or link your Git repository.
*   **Vercel:** Link your Git repository.
*   Any other service that hosts static HTML, CSS, and JavaScript files.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME/issues) (if applicable) or submit a pull request.

*(Optional: Add more specific contribution guidelines if desired)*

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (or simply state "MIT Licensed" if no separate file exists).
