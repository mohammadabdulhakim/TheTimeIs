<h1 align="center">بسم الله الرحمن الرحيم</h1>

<h4 align="center">All praise is due to The Creator of the heavens and the earth</h4>

## How I Used Github API to Generate a Dynamic Name Updating Every Minute!


## 1- Getting the current time in GMT

```js
const currentDate = new Date().toUTCString();

console.log(currentDate)   // Sun, 28 May 2023 08:00:48 GMT
```

we only want "08:00"

```js

const hoursAndMinutes = currentDate.slice(currentDate.indexOf(":")-2,22);

```

---

## 2- Generating the new name

so, the whole new name will be 

```js

const newname = `The time is ${hoursAndMinutes} GMT`;
console.log(newname) // The time is 08:00 GMT

```

make a function which return the new name;

```js

const generateNewName = () => {
  const currentDate = new Date().toUTCString();
  const hoursAndMinutes = currentDate.slice(currentDate.indexOf(":") - 2, 22);

  const newname = `The time is ${hoursAndMinutes} GMT`;
  return newname;
};
console.log(generateNewName()) // logs "The time is 08:00 GMT"
```

---

## 3- Getting the github token
you will need your github token to use it when update your account.

you can find the steps get your token in [github docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

1. [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. select scopes you want, (be sure to select "user" scope to be able to "Update ALL user data")
4. then generate token, and copy this.
5. add this token to .env

--- 

## 4- installing packages
`npm i dotenv`
`npm i cross-fetch`

---

## 5- update account name with github api

```js

const updateAccount = () =>{
    fetch('https://api.github.com/user', {
      method: 'PATCH',
      body: JSON.stringify({
        name: generateNewName(),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    })
}


``` 
and run this function in interval each 60000ms

```js

setInterval(() => {
    updateAccount()
}, 60000)

```

## 6- run the code
write `node {filename}.js` in the terminal.
e.g. `node index.js`

so, the whole code will be 

```js

const dotenv = require("dotenv");
const fetch = require("cross-fetch")

dotenv.config()
const token = process.env.GITHUB_TOKEN


//*========> [ GENERATE THE NEW NAME ] <============= 
const generateNewName = () => {
  const currentDate = new Date().toUTCString();
  const hoursAndMinutes = currentDate.slice(currentDate.indexOf(":") - 2, 22);

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
    console.log(res.status)
}
//!=====================================


//*========> [ EVERY MINUTE ] <============= 
setInterval(() => {
    updateAccount()
}, 60000)
// !================

```