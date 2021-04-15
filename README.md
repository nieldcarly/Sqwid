# Sqwid: The Online Art With Friends App

This repository contains both the frontend and backend code for the web application. The frontend code can be found in the 'SqwidReact' folder and the backend code can be found in the 'Sqwid' folder. The frontend was create with React, and the backend API was created with C# ASP.NET.

## Configuring the Database
For this project, you'll need to create a database. In the 'SqwidDB' folder, you'll find an .sql script to generate the SQL Server database. Run that script on the platform of your choice (my database is housed in Azure), and copy the connection string.

## Configuring the C# ASP.NET API
Once you have the database set up, you'll need to paste your connection string into your appsettings.json file.

## Configuring the React App
You'll need to add a .env file to your React project containing links to the API and the photos folder. For example, mine looks like this:
```
REACT_APP_API=http://localhost:52121/api/
REACT_APP_PHOTOPATH=http://localhost:52121/Photos
```
You will also need to run `npm install` to pull in the necessary packages. Also, you'll need to run `npm install react-sketch --save`. This will pull in the canvas tool for which you can find the source code [here]('https://github.com/tbolis/react-sketch').