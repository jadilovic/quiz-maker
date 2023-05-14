# To run Quiz Maker App locally:

Create .env file with following values:
REACT_APP_MODE=development
REACT_APP_LOCAL_JSON_SERVER=http://localhost:5000
Run `npm start` to start Quiz Maker App and `npm run server` to start JSON Mock Server.

# To deploy Quiz Maker App

Create .env file with following values:
REACT_APP_MODE=production
REACT_APP_DEPLOYED_JSON_SERVER='path to server where JSON Server was deployed' - for the purpose of this task JSON Server was deployed on https://quiz-server-vlwu.onrender.com/

# Deployed Quiz Maker App

Quiz Maker client side was deployed on Netlify: https://ja-quiz-maker.netlify.app/ - since JSON Server to witch fetch requests are made is deployed on Render free tier loading time for the first fetch request from client is about one minute.

- JSON Server backend side was deployed on Render: https://quiz-server-vlwu.onrender.com/

# GitHub

Quiz Maker Client, including JSON Server (local): https://github.com/jadilovic/quiz-maker -
Quiz Maker Mock JSON Server: https://github.com/jadilovic/quiz-server

# Use

The App lets you create quizzes, add questions with answers to quizzes, solve quizzes, perform all CRUD operations and review quizzes and questions.

## Technologies Used

This project was bootstrapped with Create React App
Quizzes and questions are stored on JSON Server locally or JSON Server deployed on Render.
React Swipeable is used for Quiz Slides
Styling is done with CSS
