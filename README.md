# Survey O-Clock - Client
This application allows users to create, view, edit and delete surveys.

## Important Links
- [Survey O-Clock Client Repo](https://github.com/telsey-ai/Survey-Client)
- [Survey O-Clock API](https://serene-brushlands-56021.herokuapp.com)
- [Survey Client](https://telsey-ai.github.io/Survey-Client/)

## App Screenshot

![Survey page](https://i.imgur.com/d3zq7XS.png)

## Planning Story

I thought it would be interesting to create a google forms clone for my capstone project.  I wanted to use ReactJS as the framework for the front end and express with JavaScript on the backend.

Before i started i created wireframes and an ERD for the application.

I wanted to allow users to make surveys and then allow other users to take those surveys.  I started by creating the models for the database first and then wrote the routes for them so that users could create, read, update and destroy surveys.

After the backend was working I implemented each feature one by one on the front end until all of the necessary functionality was built.

### User Stories

* As an unregistered user i want to be able to sign up for an account.
* As a registered user i want to be able to log in.
* As an authorized user i want to be able to create surveys.
* As an authorized user i want to be able to add questions to my surveys.
* As an Authorized user i want to be able to view responses to my surveys.
* As an Authorized user i want to be able to send my survey to people to take it.

### Preparation to Install

1. Fork and clone this repository.
2. Create a new branch to work on.
3. Checkout to your new branch.
4. Install dependencies by running ```npm install```.
5. Spin up server with ```npm start```.

### Technologies Used

- JavaScript
- expressjs
- mongoose
- mongodb
- Deployed on Heroku

### API Routes

Auth Routes:

- POST sign-up/
- POST sign-in/
- DELETE sign-out/
- PATCH change-password/

Survey Routes:

- GET survey/
- POST survey/
- Patch survey/:id/
- DELETE survey/:id/

### Installation Instructions:
1. Fork Repository
2. Clone Repository locally on your computer
3. Switch into the Repo on the command line
4. Enter "npm install", confirm that this finishes with success.
6. Enter "npm run server" to access the API locally

### Unsolved Problems/Future Updates

- Add questions to surveys.
- Provide a way for other users to take other peoples surveys.
- Add more styling to the site.
- Would like to eventually make the site mobile responsive.

#### Wireframe and ERD
![Homepage](https://media.git.generalassemb.ly/user/27002/files/5a2f0300-b482-11ea-9bc2-4157ca9760da)

![SignUp](https://media.git.generalassemb.ly/user/27002/files/5ef3b700-b482-11ea-8479-ab161dd5ddb1)

![Surveys](https://media.git.generalassemb.ly/user/27002/files/60bd7a80-b482-11ea-9120-dfa11dbd32bf)

![ChangePassword](https://media.git.generalassemb.ly/user/27002/files/62873e00-b482-11ea-838c-db2ab6f86766)

![Create Survey](https://media.git.generalassemb.ly/user/27002/files/64510180-b482-11ea-93a9-0043e8ecd119)

![Take Survey](https://media.git.generalassemb.ly/user/27002/files/661ac500-b482-11ea-9660-4f24aaa22981)

![ERD](https://media.git.generalassemb.ly/user/27002/files/4506a400-b483-11ea-9af3-dbb5b64068d0)
