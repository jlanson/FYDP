const neo4j = require('neo4j-driver');

// Create a Neo4j driver instance
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', '12345678')
);

// Define the Cypher query to retrieve all data
const cypherQuery = 'MATCH (n) RETURN n';

// Create a session to execute the query
const session = driver.session();

// Execute the query
session.run(cypherQuery)
  .then(result => {
    // Process the query result
    console.log('starts here')
    console.log(result.records)
    result.records.forEach(record => {
      // Access the data from the 'n' variable in the query
      const data = record.get('n').properties;
      console.log(data);
    });
  })
  .catch(error => {
    console.error('Error executing query:', error);
  })
  .finally(() => {
    // Close the session and driver when done
    session.close();
    driver.close();
  });
