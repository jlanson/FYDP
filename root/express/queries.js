module.exports = {
  getRoute: async function (driver, id1, id2) {
    const session = driver.session({ database: "neo4j" });

    try {
      // shortest path algorithm
    } finally {
      await session.close();
    }
  },
  getLocationData: async function (driver) {
    const session = driver.session({ database: "neo4j" });

    try {
      const readQuery = `MATCH (n) RETURN n AS node`;

      const readResult = await session.executeRead((tx) => tx.run(readQuery));

      const response = readResult.records.map((record) => {
        const node = record.get("node");
        return node.properties;
      });
      return response;
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    } finally {
      await session.close();
    }
  },
};
