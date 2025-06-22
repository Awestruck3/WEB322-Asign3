const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects =[];

function initialize(){
    return new Promise((resolve, reject) =>{
        let indexer = 0; //I know this is a terrible name for tracking but index was already input by the time I made this
        projectData.forEach(element => {
            projects[indexer] = element;
            sectorData.forEach(index =>{
                 if(projects[indexer].sector_id == index.id){ //Nested forEach because I couldn't seem to get find working
                     projects[indexer].sector = index.sector_name;
                 }
            });
            indexer += 1;
        });
        //console.log(projects);
        resolve(projects);
    });
    
}

function getAllProjects(){
    return new Promise((resolve, reject) =>{
        resolve(projects);
    });
}

function getProjectById(projectId){
    let foundProj = projects.find((element) => element.id == projectId);
    return new Promise((resolve, reject) =>{
        foundProj ? resolve(foundProj) : reject("Error");
    });
    //let foundProj = projects.find((element) => element.id == projectId);
    // console.log(projects.find((element) => element.id == projectId));
    resolve(foundProj);
}

function getProjectBySector(sector){
    sector = sector.toLowerCase();
    let foundProjs = projects.filter(str => str.sector.toLowerCase().includes(sector));
    return new Promise((resolve, reject) => {
        foundProjs ? resolve(foundProjs) : reject("Error");
    });
    //resolve(foundProjs);
    // console.log(projects.filter(str => str.sector.toLowerCase().includes(sector)));
}

module.exports = {getAllProjects, initialize, getProjectById, getProjectBySector};