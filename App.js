var axios = require('axios');
module.exports = async (username,token) => {
if(!(username&&token)) throw Error('Please enter username and token correctly')
else axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
var data = await isnpmrepo(username)
console.log('Working')
}
async function isnpmrepo(username){

var data = await getRepos(username);
data.map(async names => {
var exists = await Check(username,names)
if(exists) await axios.post(`https://api.github.com/repos/${username}/${names}`,{description:exists})

})
}

async function getRepos(username){
var repo = await axios.get(`https://api.github.com/users/${username}/repos?per_page=2000`),
names = [];
repo.data.map(name => names.push(name.name))
return names
}
async function Check(username,names) {
try {
var data =  await axios.get(`https://raw.githubusercontent.com/${username}/${names}/master/package.json`)
return data.data.description
}
catch(err) {
return false
}
}