# COMP322-Explore

A mobile application that let users find and book luxury resorts and hotels (4-5 stars).

## How to Run

Note: Android wasn't tested while developing.

### Setting up

You need to first set up a new firebase project and connect the app to it. Follow these instructions: https://rnfirebase.io/#3-ios-setup

Then, you need to acquire the API key (https://rapidapi.com/tipsters/api/booking-com/)

1. Log in or create an account at https://rapidapi.com/
2. Subscribe to appropriate billing plan for the API (basic is recommended): https://rapidapi.com/tipsters/api/booking-com/pricing
3. Return to https://rapidapi.com/tipsters/api/booking-com/ and grab your API key: ![API key](https://i.imgur.com/G0wcrR4.jpg)

4. Create a secret.json under /src/data/ and add the API key to the JSON file. Example: https://github.com/dustinn1/COMP322-Explore/blob/main/src/data/secret.json.example

### Running on iOS

Make sure the React Native CLI for iOS environment is set up correctly: https://reactnative.dev/docs/environment-setup

1. From the root of the project: `yarn install`
2. Go to the iOS directory: `cd ios`
3. Install the pods: `pod install`
4. Return to the root of the project: `cd ..`
5. Start Metro: `npx react-native start`
6. In a separate terminal window, start the application: `npx react-native run-ios`
