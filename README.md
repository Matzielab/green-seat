# **Gemini API competition submission**

This branch represents the state the code was in when submitted to the Google Gemini API competition. Everything except the README.md file was submitted. You can also see the [submission video](https://youtu.be/x-b0fCmL-Hc)

# **Green Seat: Meetings using Environmental Intelligence**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Green Seat is an AI-powered meeting tracker built using React and Firebase. It ensures that your decisions during meetings do not negatively impact the environment. Green Seat lets you upload and store meeting files and notes, summarizes them and provides insights on how to make your decisions more sustainable.

## **Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## **Features**

- **Environmental Impact Reports:** Generate detailed eco-reports after each meeting, highlighting opportunities to lower your carbon footprint.
- **Comprehensive Meeting Management:** Easily create, organize, and track meetings. Capture notes, attendees, dates, attachments, actions and decisions in one central location.
- **Secure & Open Source:** Enjoy the flexibility of open-source software with the security of Google account login. Easy to setup and host yourself on firebase.

## **Installation**

To get started with Green Seat, follow these steps:

1. **Clone the Repository**

2. **Setup a firebase project**
   Create a new firebase project, make sure to enable these functions:

   - Authentication with Google
   - Storage
   - Firestore Database
   - Vertex AI
   - App check (optional but recommended)
   - Hosting (optional but recommended)

3. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

4. **Setup firebase configuration (local use)**
   If ran locally, you can use the .env file with your firebase credentials. If hosted on firebase this is not needed.

   ```
   cp .env.sample .env
   nano .env
   # Add your firebase credentials
   ```

5. **Setup Green Seat config**
   Setup the configuration file for green seat

   ```
   cp src/sample-green-seat.config.ts src/green-seat.config.ts
   ```

   edit the green-seat.config.ts in your preffered editor

6. **Run the Application**

   Start the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## **Contributing**

Contributions are welcome! If you would like to contribute to Green Seat, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Contact**

If you have any questions or suggestions, feel free to contact me:

- **Email:** mathias@matzielab.com
- **GitHub:** [Matzielab](https://github.com/matzielab)
