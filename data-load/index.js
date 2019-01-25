const WebSocket = require('ws');
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.170.2.json');
const Halyard = require('halyard.js');
const mixins = require('halyard.js/dist/halyard-enigma-mixin');
const fs = require('fs');

(async () => {
  try {
    console.log('Creating Halyard table data representation.');
    const halyard = new Halyard();
    const data = fs.readFileSync('./data/movies.csv').toString()
    const reviewsTable = new Halyard.Table(data);

    halyard.addTable(reviewsTable);

    console.log('Opening session app on engine using Halyard mixin.');
    const session = enigma.create({
      schema,
      mixins,
      url: 'ws://localhost:19076',
      createSocket: url => new WebSocket(url),
    });
    console.log("Created. Opening...")
    const qix = await session.open();
    console.log("Opened. Creating App...")
    const app = await qix.createAppUsingHalyard('Movies',halyard);

    console.log('Creating session object with movies.');
    const movieCount = 10;
    const properties = {
      qInfo: { qType: 'movie-data' },
      qHyperCubeDef: {
        qDimensions: [{ qDef: { qFieldDefs: ['movie_title'] } }],
        qInitialDataFetch: [{ qHeight: reviewCount, qWidth: 1 }],
      },
    };
    const object = await app.createSessionObject(properties);
    const layout = await object.getLayout();
    const movies = layout.qHyperCube.qDataPages[0].qMatrix;

    console.log(`Listing the ${movieCount} first movies:`);
    movies.forEach((movie) => { console.log(movie[0].qText); });

    await session.close();
    console.log('Session closed.');
  } catch (err) {
    console.log('Whoops! An error occurred.', err);
    process.exit(1);
  }
})();