import { container } from "../config/cosmos.js";

const metrics = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    // Query for all-time count
    const totalQuery = { query: "SELECT VALUE COUNT(1) FROM c" };
    const { resources: totalResources } = await container.items.query(totalQuery).fetchAll();
    const totalCount = totalResources[0];

    // Query for today's count
    const todayQuery = {
      query: "SELECT VALUE COUNT(1) FROM c WHERE c.createdAt >= @start AND c.createdAt <= @end",
      parameters: [
        { name: "@start", value: startOfDay },
        { name: "@end", value: endOfDay },
      ],
    };
    const { resources: todayResources } = await container.items.query(todayQuery).fetchAll();
    const todayCount = todayResources[0];

    // Query for leads by service_needed
    const serviceQuery = {
      query: `
        SELECT c.services_needed AS service, COUNT(1) AS count
        FROM c
        WHERE IS_DEFINED(c.services_needed) AND c.services_needed != ""
        GROUP BY c.services_needed
      `,
    };
    const { resources: serviceResources } = await container.items.query(serviceQuery).fetchAll();

    const byService = {};
    serviceResources.forEach((item) => {
      byService[item.service] = item.count;
    });

    // Query for leads by source
    const sourceQuery = {
      query: `
        SELECT c.source AS source, COUNT(1) AS count
        FROM c
        WHERE IS_DEFINED(c.source) AND c.source != ""
        GROUP BY c.source
      `,
    };
    const { resources: sourceResources } = await container.items.query(sourceQuery).fetchAll();

    const bySource = {};
    sourceResources.forEach((item) => {
      bySource[item.source] = item.count;
    });

    res.json({
      success: true,
      total: totalCount,
      today: todayCount,
      byService: byService,
      bySource: bySource, // ✅ returning sources too
    });
  } catch (error) {
    console.error("❌ Error fetching metrics:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch metrics",
      error: error.message,
    });
  }
};

export { metrics };
