# Project Name



## Description

Search platform for the Stock Market around the world with a small news feed for user to interact.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage to see a application teaser, also to log in and sign up.
- **sign up** - As a user I want to sign up on the web page so i can login.
- **login** - As a user I want to be able to log in on the web page so that I can have access to the newsFeed and stocks information.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **result** - As a user I want to see the market news feed and stock fluctuation. 
- **stocks listing** - As a user I want to be able to see details of the stocks that are stored in the listings (TOP 10 's'). Also to educate our users about the stock market.
- **news Feed** -  As a user i want to see the news feed, news details and interact with each news post.



## Server Routes (Back-end):

| **Method** | **Route**                               | **Description**                                              | Request - Body         |
| ---------- | --------------------------------------- | ------------------------------------------------------------ | ---------------------- |
| `GET`      | `/`                                     | Main page route. Renders home `index` view, to login or sign up. |                        |
| `POST`     | /                                       | Sends Login form data to the server. Redirects to Home Page for users. | { username, password } |
| `GET`      | `/signup`                               | Renders `signup` form view.                                  |                        |
| `POST`     | `/signup`                               | Sends Sign Up info to the server and creates user in the DB. Redirect to `/` | { username, password } |
| `GET`      | /views/home                             | Private route. Renders `homepage views` for users.           |                        |
| `GET`      | `/views/stock-views/stock-view`         | Private route. Renders the list of the stocks you selected.  |                        |
| `GET`      | `/views/stock-views/stock-view-details` | Private route. Renders the details of the selected stock.    |                        |
| `GET`      | /views/news-views/news-view             | Private route. Renders the news feed                         |                        |
| `GET`      | /views/news-views/news-view-detail      | Private route.  Renders the details of the selected news with a Form to comment |                        |
| `POST`     | `/views/news-views/news-view-detail`    | Renders the post on the `news-view-detail` page.             |                        |
| `Get`      | `/Logout`                               | Terminates the session, redirects to `/`                     |                        |

## Models

User model

```
const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  },
  {
    timestamps: true,
  }
);
```

Comment model

```
const commentSchema = new Schema(
  {
    comment: {type: String, required: true},
    commentID: {type: String, required: true, default: "Anonymous"}
  },
  {
    timestamps: true,
  }
);
```



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/JCoutinho91/StockOverFlow---Module-2)

[Deploy Link](https://gist.github.com/ross-u/8f91ec13aeaf35a1ba7603848284703f)



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors

**José Guedes** 

 `https://github.com/JCoutinho91` 



**Maximilian Haut Mayer** 

`https://github.com/MaximilianHM`

`https://www.linkedin.com/in/maximilianhm/`