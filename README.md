# pg-tickle
A health insurance calculator

### To run app I need node >= 7.1.0

Install the dependencies and start the server.

```sh
cd pg-TICKLE
npm install
npm start
```

### To run test

```sh
npm test
```

### Design decisions

I utilized React as my front end javascript framework because the class components are modular.
Also, as the applications grows and the state needs to be managed we can incorporate Redux.
For now the health conditions are in a json file.
In the future we want to consider using database like PostgreSQL to access the data.
