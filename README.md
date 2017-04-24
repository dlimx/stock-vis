# Stock Visualizer

A simple (mostly front end) visualizer for [Quandl](http://www.quandl.com) stock data.

The front end is a React single-page application, with Redux used to handle search and comparison state.

The back-end uses Node to act as a simple microservice API wrapper to hide my API key.

### Try It!

```shell
git clone https://github.com/DavidLi-Minxiao/stock-vis.git
yarn install
yarn run serve
```

Navigate to `localhost:8080` to try it out!

### To-Do

Save searches in a database rather than in a JSON array.

Cache most commonly requested data within a database rather than making an API call.

Better visualizations

### License
MIT