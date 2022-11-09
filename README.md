# Catstagram

## How could I run the application?

- Firstly, you need to make sure you have `NodeJS` on your machine (install it [here](https://nodejs.org/en/)). The application could be run from version 16.15.1.
- After opening application folder, enter command `npm install` to install all dependencies used.
- `npm start` to run the application. Normally, It will be run on localhost:3000, if you are also running another application, please either change port for the application or terminate the current working application.
- Open your web browser and navigate to the link displayed on your terminal.

## Main features in the application

- The application has two pages: Home page and Detail page.
- On the `Home page`, the application should render all breeds available under a dropdown.
- If a breed is chosen, the application should render breed images with a link to go to detail page (initally 5 items).
- User could load more images by clicking on `Load More` button (5 images loaded at a time).
- If user has reached the end of breed image list, the `Load More` button would be disabled.
- Once clicking on `View Detail` in any certain image card, the page would route to `Detail page`, which contains image and other information such as breed name, description, origin, etc.
- There is also a `Back button`. That helps to go back to the home page with the last chosen breed and its images.
- Application is responsive in Desktop, Tablet and Mobile environment.
