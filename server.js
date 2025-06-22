/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Scott Denby Student ID: 118823244 Date: 06/21/25
*
********************************************************************************/

const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const projectData = require("./modules/projects");

const path = require('path');

projectData.initialize();

app.use(express.static('public'));

app.set('views', __dirname + '/views');

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.get('/about', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/views/about.html'));
});

app.get('/solutions/projects', (req, res) =>{
    let sector = req.query.sector;
    projectData.getAllProjects();
    if(sector){ //What do I do if sector is []?
        // console.log(typeof sector); This was just for troubleshooting
        console.log(sector[0]);
        projectData.getProjectBySector(sector)
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            res.status(404).sendFile(path.join(__dirname, "./public/views/404.html"));
        })
    }
    else{
        projectData.getAllProjects().then((reply) => {
            res.send(reply);
        })
     }
});

app.get('/solutions/projects/:id', (req, res) =>{
    projectData.getProjectById(req.params.id).then((reply) =>{
        res.send(reply);
    })
    .catch((err) =>{
        res.status(404).sendFile(path.join(__dirname, "./public/views/404.html"));
    })
    //res.send(projectData.getProjectById(9));
});

app.use((req, res, next) => {
    console.log("test");
    res.status(404).sendFile(path.join(__dirname, "./public/views/404.html"));
  });

app.listen(HTTP_PORT, () => console.log("Server is listening"));


