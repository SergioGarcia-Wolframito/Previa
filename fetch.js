import request from 'request';
import fs from 'fs';
import chalk from 'chalk'

const fetchData = (callback, url,text,data) => {
  let json = `${text}.json`
  if (!data) data = [];
  try{
    data = JSON.parse(fs.readFileSync(json).toString());
    console.log(`\n${chalk.yellow("JSON already created")}`);
    if(url==="https://swapi.co/api/starships/")
      callback(data);
  }catch(e){
    console.log('fechting data...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        data = [...data, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchData(callback, response.body.next,text, data);
      else {
        fs.writeFileSync(json,JSON.stringify(data));
        console.log(`\n${chalk.yellow("JSON created")}`);
        if(url==="https://swapi.co/api/starships/")
          callback(data);
      } 
    });
  }
};

export { fetchData };
