const dotenv = require("dotenv");
const fetch = require("cross-fetch")

dotenv.config()
const token = process.env.GITHUB_TOKEN


//*========> [ GENERATE THE NEW NAME ] <============= 
const generateNewName = () => {
  const currentDate = new Date().toUTCString();
  const hoursAndMinutes = currentDate.slice(currentDate.indexOf(":") - 2, 25);

  const newname = `The time is ${hoursAndMinutes} GMT`;
  return newname;
};
//!======================


//*========> [ UPDATE ACCOUNT FUNCTION ] <============= 
const updateAccount = async() =>{
    let res = await fetch('https://api.github.com/user', {
      method: 'PATCH',
      body: JSON.stringify({
        name: generateNewName(),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    })

    const message = res.status === 200?
     "Successfully changed"
     :
     `Error: ${res.statusText}`
    console.log(message)
}
//!=====================================


//*========> [ EVERY MINUTE ] <============= 
setInterval(() => {
    updateAccount()
}, 1000)
// !================