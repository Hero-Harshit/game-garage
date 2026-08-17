# Game Garage

Welcome to Game Garage! This is a little side project I put together to learn more about React Native and Expo Router. 

## What is this project?
The main aim of Game Garage is to create a fun, retro arcade style hub for classic mini games. Right now, it features two games:
* **Tic Tac Toe**: A classic game where you play against a computer opponent. I added a slight delay to the computer's moves so it actually feels like you are playing against someone!
* **Rock Paper Scissors**: A quick battle against the computer where your choices are shown side by side in a cool arena layout.

Under the hood, the app uses Expo and React Native. It relies on Expo Router for handling navigation between the main menu and the different game screens. All the logic for the games is written in TypeScript and styled using standard React Native stylesheets.

## How to run the app on Android

If you want to try the app yourself on your Android phone, it is super easy. Just follow these steps:

1. Download the **Expo Go** app from the Google Play Store on your Android device.
2. Clone this repository to your computer and open a terminal in the project folder.
3. Install the required packages by running:
   ```bash
   npm install
   ```
4. Start the Expo development server:
   ```bash
   npm run start
   ```
5. A QR code will pop up in your terminal. Open the Expo Go app on your phone and scan that QR code. 
6. Give it a few seconds to bundle the JavaScript, and the app will load right on your screen!

Enjoy the games and feel free to look through the code if you are curious about how it all works.
