REST API boilerplate

This boilerplate uses express and sequelize, read the respective documentation for help.

In ApiServer.js you can deactivate the auth middleware or add bypass routes.

#How to install:

Copy the config.sample.js and rename it to config.js. Change the configuration accordingly.

Don't forget to create the databases. Tables will be created automatically if they do not exist. There is a force function in server.js

run "npm install"

run "npm run dev"

#Extra info

Routes will be added automatically when you add a file in the routes folder. Same works for models.

You can edit the .eslintrc file to change any eslint rules.

There are model examples includes. It's a somewhat standard User and Role setup to showcase the hooks and class/instance methods.

I made an associate function which will be executed automatically, here you can associate different tables with eachother.

For questions email: kenrickhalff@gmail.com or open an issue.

I will not update this frequently so if you want to fork it or want to push updates to it, go on ahead.
