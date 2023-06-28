module.exports = {
  getRoute: async function (driver, from, to) {
    const session = driver.session({ database: "neo4j" });

    try {
      const readQuery = `MATCH (source:Node {name: '${from}'}), (target:Node {name: '${to}'})
      CALL gds.shortestPath.dijkstra.stream('myGraph', {
          sourceNode: source,
          targetNode: target,
          relationshipWeightProperty: 'cost'
      })
      YIELD index, sourceNode, targetNode, totalCost, nodeIds, costs, path
      RETURN
          index,
          gds.util.asNode(sourceNode).name AS sourceNodeName,
          gds.util.asNode(targetNode).name AS targetNodeName,
          totalCost,
          [nodeId IN nodeIds | gds.util.asNode(nodeId).name] AS nodeNames,
          costs,
          nodes(path) as path
      ORDER BY index`;

      const readResult = await session.executeRead((tx) => tx.run(readQuery));

      //Keeping this iterative because we might want multiple paths??? jic
      const response = readResult.records.map((record) => {
        console.log(record.get('totalCost'), record.get('nodeNames'), record.get('costs'))
        return {
          totalCost: record.get('totalCost'),
          nodeNames: record.get('nodeNames'),
          costs: record.get('costs')
        }
      });
      return response;
    } finally {
      await session.close();
    }
  },
  getLocationData: async function (driver) {
    console.log("arrived")
    const session = driver.session({ database: "neo4j" });

    try {
      const readQuery = `MATCH (n:Location) RETURN n AS node`;

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
