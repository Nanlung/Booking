const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({

  schema: buildSchema(`
    type RootQuery {
      events: [String!]!

    },

    type RootMutation {
       createEvent(name: String): String



    },



    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return ['Conferences', 'Weddings', 'Rallies']

    },

    createEvent: (args) => {
      const eventName = args.name;
      return eventName;

    }
  },

  graphiql: true

}))





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));