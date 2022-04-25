# Randomly-id-generator

A powerful node module that allows you to generate random ids:

```yarn
npm i randomly-id-generator
```

If you want to generate a random id you only have to do this:

```js
const { Generator } = require('randomly-id-generator');

const id = new Generator().generate();

console.log(id); //the id generated

//we declare id as a new Generator and we generate a new id
```

You can customize your id:

```js
const id = new Generator();

id.length = 13; //the number of characters the id will have

id.custom = 'a b c'; //you can customize the characters putting on a string separeted with an empty character or on an array ["a", "b", "c"]

id.generate(); //generates the id with the characters "a", "b" and "c"

console.log(id);
```

You also can put the default types of ids that are:

```js
'default'; //the default id composed by numbers, letters and symbols
'only_numbers'; //only numbers on the id
'only_letters'; //only letters on the id

//Important: If you do not put a customize id and any type by default the type is going to be the default.
```

If you put a customize id and a default type the npm will give you an error

If you want to report an issue or a bug you can go to this [GitHub Repository](https://github.com/PabloRNC/randomly-id-generator/issues) and report it and I will fix it as fast as I can
