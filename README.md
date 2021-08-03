# Guild Chat App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Directions

Clone the repo, cd into the project directory and run:

### `yarn install`

Once the dependencies are installed run:

### `yarn start`

Navigate to http://localhost:3000/ to view the application


## Basic Usage

- Upon navigating to the home screen a user can create multiple usernames to chat between.
- Once multiple usernames have been created a user can select one of the names and be directed to a new path with an option to choose the other users to chat with.
- After a user selects a name to recieve thier chat, the history between the users will be displayed as well as an input field and 'Send' CTA to initiate a new message.
- A new browser tab can be opened to respond to the first username's messages, with the chat data syncing across the tabs. 
- More usernames and chats can be initiated by following the previous steps. 

## Technologies
- [Create React App](https://create-react-app.dev/docs/adding-typescript/) with Typescript as the app template.
- [Chakra UI](https://chakra-ui.com/) for accessible UI Components to make styling simpler. 
- [Firebase](https://www.npmjs.com/package/firebase) for realtime database and persisting message data.

## Takeaways
- If I were to complete this task again, I would simplify the chat functionality and user data models, thinking those through first before building out routing and user creation functionality. 
- If the user creation and selection flow was similar to this iteration I would implement the useContext hook to more easily pass data between the components in different routes and files. 
- I think my initial idea was overengineered and relied on too much technology I was not as familiar with given the timeframe. 

## Next Steps
- Refactor async state updates in useEffect
- Implement Context for state management 
- Responsive styling and Chakra theming 
- Incorporate a testing suite
- Proper Typescript implementation 

