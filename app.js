// let urlstar = result.url.match(/(\d+)/); 
// urlstar = parseInt(urlstar);


import { fetchData } from './fetchdata';
import { GraphQLServer } from 'graphql-yoga'

// rickymorty entry point
const url1 = 'https://swapi.co/api/people/';
const url2 = 'https://swapi.co/api/planets/';
const url3 = 'https://swapi.co/api/films/';
const url4 = 'https://swapi.co/api/species/';
const url5 = 'https://swapi.co/api/vehicles/';
const url6 = 'https://swapi.co/api/starships/';

/**
 * Main App
 * @param data all Star Wars database
 */
const runApp = data => {
    const typeDefs = 
    `
    type Query {
      hello:String!
      names:[String!]!
      planet(name: String):Planet
    }

    type Planet{
        name:String!
        climate:String!
        terrain:String!
        rotation_period:Int!
        orbital_period:Int!
    }
    `
    const resolvers = {
        Query:{
            hello: () => "Hola Paco",
            names: () =>{
                        const names = [] 
                        data.forEach(elem => {names.push(elem.name);});
                        return [... new Set(names)];
                        },
            planet:(parent,args,ctx,infor) => {
                const found = data.find(elem => elem.name === args.name);
                return{ 
                    name: found.name, 
                    climate: found.climate, 
                    terrain: found.terrain,
                    rotation_period: found.rotation_period,
                    orbital_period: found.orbital_period,
                  }
            }
        }
}
    const server = new GraphQLServer({typeDefs,resolvers});
    server.start({port:"3003"});
};

// main program
fetchData(runApp, url1,"people");
fetchData(runApp, url2,"planets");
fetchData(runApp, url3,"films");
fetchData(runApp, url4,"species");
fetchData(runApp, url5,"vehicles");
fetchData(runApp, url6,"starships");
