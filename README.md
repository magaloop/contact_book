# Contact Book

This Ruby on Rails and React JS application is the starting point for the
interview tasks for software developer jobs at Magaloop. Interview tasks are
formulated as features to be implemented in this app, and will be provided to
you after receiving your job application, along with detailed instructions.

![Contact Book screenshot](https://raw.github.com/magaloop/contact_book/master/screenshot.png)

When working on the interview task:

  * **Keep it simple**. No need to impress us with clever tricks. We appreciate
    working solutions that get the job done and are simple to understand and
    maintain. If you find a solution that takes little code, that's great.

  * **Write tests**. Whether to work with TDD or to write tests later is
    completely up to you, but we do appreciate good tests, that make code easy
    to change and evolve. You can check the existing tests to adopt a similar
    testing style.

  * **Follow the project style**. We won't nitpick on details, but generally
    following the project coding style, formatting and conventions is a plus.
    You can run the linter to check your code formatting (see the "How To"
    section in this file).

  * You can introduce new libraries, but try to keep it simple: only add
    dependencies that make your solution more solid in your opinion.

  * If you want to explain something about your solution, please do so by
    editing the SOLUTION_README.md file in the project root folder.

**NOTE:** your solution to the interview task is private, so please do not
submit it as a pull request or as a public repository. Instructions on how to
properly submit your solution will be provided to you after your job
application.

Have fun :)


## Setup

Make sure you have all the development dependencies installed:

  - A recent Ruby version (`2.6.x` is recommended)
  - A recent NodeJS version
  - The `bundler` ruby gem
  - The `yarn` package manager for JavaScript
  - The SQLite database

Clone the git repo:

```
git clone git@bitbucket.org:magaloop/webapp.git
```

Then:

  - Run `bundle install` to install all needed gems
  - Run `yarn install` to install all JavaScript packages
  - Run `bin/rake db:setup` to setup the development and test databases

If all is fine, you should be able to run all tests with `make test`.

Read the "How To" section in this file for instructions on starting the app.

If you encounter any blocking issue while setting up this app, do not esitate to
contact us: while we expect that you are able to search the Web for common
issues, debugging our app setup is not part of the job interview, and we won't
judge you negatively for getting stuck into some setup issue that we failed to
document properly.


## Project Structure

This app is built with:

  - [Ruby on Rails](https://rubyonrails.org) on the backend
  - [React JS](https://reactjs.org) on the frontend

### Backend

The project backend is a plain Ruby on Rails 5.2 app, using the
[graphql-ruby](https://graphql-ruby.org) gem to expose a GraphQL API and some
restful endpoints to the frontend app.

The test framework is [rspec](http://rspec.info) and
[rspec-rails](https://github.com/rspec/rspec-rails).

_Note:_ the `spring` and `turbolinks` gems have been removed from the app, to
simplify the setup and avoid issues difficult to troubleshoot.

The app uses the SQLite database, which simplifies the setup of the development
environment.

### Frontend

The frontend is a React JS single page application, using [Apollo
Client](https://www.apollographql.com/docs/react/) to perform queries to the
GraphQL API exposed by the backend, and [axios](https://github.com/axios/axios)
to perform requests to the REST endpoints offered by the backend.

The app uses [Webpack](https://webpack.js.org) via the
[rails/webpacker](https://github.com/rails/webpacker) gem to compile and serve
the frontend code (JavaScript and CSS).

When working on JavaScript or CSS, the `app/javascript` directory is your
working directory. You can ignore all code in `app/assets`.

If you need to add some static file (e.g. images, or CSS) you can either put
them in the `app/javascript` and `include` them in your JavaScript files
(leveraging Webpack and Babel loaders), or just put it in the `/public` folder
(to be served statically).

The stylesheets can be written using either CSS or SCSS syntax within the
`app/javascript` folder: you can see an example of loading a CSS file in the
`app/javascript/ContactBook/ContactBook.jsx` file, which loads styles from
`app/javascripts/ContactBook/ContactBook.scss`. No CSS framework is used.

The entry point file for the React app is in
`app/javascript/packs/application.js`.

The HTML code is rendered by Ruby on Rails, and lives in
`app/views/layouts/application.html.erb` (the layout part) and
`app/views/app/show.html.erb` (the page body).

The JS testing framework is [jest](https://jestjs.io), with
[enzyme](https://airbnb.io/enzyme/) to test React components.


## How To

### Start the app in development mode

  - Run `./bin/webpack-dev-server` to start the Webpack server, serving the
    frontend app
  - In another terminal window or tab, run `./bin/rails server` to start the
    Rails server, serving the backend app
  - Your app should now be running on `http://localhost:3000`

### Run tests

  - Run `make test` to run all tests
  - Run `bundle exec rspec` to run only Ruby tests
  - Run `yarn test` to run only JavaScript tests

While working on your task you can:

  - Run `bundle exec guard` to observe file changes and automatically run Ruby
    tests for relevant files
  - Run `yarn test-watch` to observe file changes and automatically run
    JavaScript tests for relevant files

### Lint your code

To make sure your code formatting follows the project conventions, you can:

  - Run `make lint` to check for code formatting issues
  - Run `make lintfix` to automatically fix formatting issues (when possible)

These commands will lint both Ruby and JavaScript code.
