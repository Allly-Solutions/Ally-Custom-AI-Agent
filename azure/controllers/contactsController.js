import { container } from "../config/cosmos.js";


const getContacts = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 100;
    const query = {
      query: `
        SELECT c.id, c.name, c.phone_number, c.email_address, c.services_needed,
               c.bot_type, c.source, c.status, c.confidence_score, c.createdAt
        FROM c
        OFFSET @offset LIMIT @limit
      `,
      parameters: [
        { name: "@offset", value: offset },
        { name: "@limit", value: limit },
      ],
    };
    const { resources } = await container.items.query(query).fetchAll();
    res.json(resources);
  } catch (error) {
    console.error("❌ Error fetching contacts:", error.message);
    res.status(500).json([]);
  }
};

export {getContacts}