// pages/api/metrics.ts
import { CosmosClient } from "@azure/cosmos";

const endpoint = '' ;
const key  = '' ;
const databaseId = "LeadDB";
const containerId = "Leads";

export default async function handler(req, res) {
  try {
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Fetch all leads
    const { resources: leads } = await container.items.query("SELECT * FROM c").fetchAll();
    console.log('Total Leads are :',leads)
 
  } catch (err) {
    console.error("❌ Failed to fetch metrics:", err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
}
