const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','12345678'));
const cypherQuery = 'MATCH (n) RETURN n';
const session  = driver.session()

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  session.run(cypherQuery)
  .then(result => {
    // Process the query result
    console.log('starts here')

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

  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});