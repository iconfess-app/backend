# Project's name: iConfess


## Description

iConfess is a webapp designed for those willing to share their secrets and also read about people's secrets, for psichological relieve. 

This project is designed as part of the last module's work at IronHack, which aims for students to develop a MERN full-stack application.

## USER STORIES

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Landing page** - As a user I want to be able to access the landing page so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the latest confessions and sort by categories

**Chose availability of communication** - As a user I want to be able to decide whether I want people to chat with me or not and whether I want my location to be known or not

**Login** - As a user I want to be able to log in on the webpage so that I can get manage my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Profile** - As a user I want to be able to see my profile and edit it

**Garden** - As a user I want to be able to see my list of plants

**Add confession** - As a user I want to be able to add confessions with some configuration (categories, is distroyed in 24h or not...)

**See confession** - As a user I want to be able to see my list of confessions if I have chosen to save them

**Delete confession** - As a user I want to be able to delete confessions from MyConfessions

**Home filter** - As a user I want to be able to filter the confessions by their different catorgies and by recently added

**Report confession** - As a user I want to be able to report a confession if the content does not follow the app's policy

**Info** - As a user I want to be able to read about the app and about what policies I should be following


## BACKLOG

**Secrets destroyed** - As a user I want to see how my confessions are deleted after 24h

**Chat** - As a user I want to be able to chat with users who also want to be in touch with me

**Locate other iConfess users** - As a user I want to be able to see a map with the places where other users made their confessions

**Filter confession content** - As a user I want to see an error when I am writing unsensitive content on a confession

**Native app feel** - As a user I want to have a nice smartphone app feeling eventhough it is not a native app


## Routes

| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home           | GET    | /home                            | See the main page with all the confessions                               |                                       |                 |
| Sign up    | POST   | /signup                        | Sign up a user with an account                          | { mail, username, password }                                   |       /confess          |
| Log in          | POST   | /login                        | Log in the user                                  | { mail, password }                      | /home               |
| Logout   | GET    | /logout                            | Logout a user                       |                                       | /login                 |
| MyConfessions        | GET   | /myconfessions               | See user's confessions                       |                    |      |
| Edit profile        | PUT   | /edit                    | Edit user's profile                                  |   { mail, username, password, darkMode, allowsContact, allowsLocation, darkMode, avatar }                                    | /myconfessions              |
| Me         | GET    | /my                      | Get current user's session          |                                       |                 |
| Profile delete  | DELETE   | /delete                      | Delete a user's profile  |                  | /sign up      |
| Confess          | POST   | /confess                       | Post a confession                     |    { description, category, isDestroyed }                                   |   /myconfessions              |
| My confession           | GET    | /myconfessions/:confessionId               | Read confessions's information and delete it                        |                                       |                 |
| Delete confession  | DELETE    | /myconfessions/:confessionId                | delete confession                   |                                       |                 |


## Models

Confession model

```js
{
    description: String,
    date: String,
    time: String,
    category: String,
    isDestroyed: Boolean,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likesCounter: Number,
}
```

User model

```js
{
    username: String,
    email: String,
    hashedPassword: String,
    isOver16: Boolean,
    userConfessions: [{ type: Schema.Types.ObjectId, ref: 'Confession' }],
    allowsLocation: Boolean,
    allowsContact: Boolean,
    darkMode: Boolean (default true),
    avatar: String,
}
```

## Links

### Github project

[Github project](https://github.com/iconfess-app)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/iconfess-app)
[Link Deploy]()

### Wireframes

[InVision with Wireframes](https://invis.io/6EUID9GH4YF)

### Slides

URls for the project presentation (slides)
[Link Slides.com](https://slides.com/)
