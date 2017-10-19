This is a record of the development process for this application.

## October 19

The goal of this app was to write it with as little modification from the standard react native as possible. No Redux or redux-react or the like. Moment and Lodash are already included in React.

Really the only thing I needed was how to render the raw HTML that comes in the text of the comments that make up the thread.

I am pleased by the changes in the APIs and the improvements over time. Especially with ListView, there has been a lot of simplification of the APIs. I really am surprised with how easy it is to create a ListView now! Just two things: Data and the Rendering of the Data.

This [little article](https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6) helped me with rendering the separators for the threadview, which was not so easy to find actually on the actual React Native website.

Next to do: Styling of the cells, NetInfo, error handling, and settings
