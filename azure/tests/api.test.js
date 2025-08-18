import request from "supertest";
import app from "../app.js";

// ✅ Proper ESM mocking
import { jest } from "@jest/globals";

// Mock cosmos.js before importing container
jest.unstable_mockModule("../config/cosmos.js", () => {
  return {
    container: {
      items: {
        query: jest.fn(), // ✅ jest.fn() so we can use .mockImplementation
      },
    },
  };
});

// ✅ Import the mocked container after mock is set up
const { container } = await import("../config/cosmos.js");

describe("API Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------ Health ------------------
  describe("GET /api/health", () => {
    it("should return server health", async () => {
      const res = await request(app).get("/api/health").expect(200);
      expect(res.text).toBe("Server is healthy");
    });
  });

  // ------------------ Metrics ------------------
  describe("GET /api/metrics", () => {
    it("should return metrics data", async () => {
      container.items.query.mockImplementation((query) => {
        if (query.query.includes("COUNT(1)")) {
          return { fetchAll: async () => ({ resources: [100] }) };
        }
        if (query.query.includes("GROUP BY c.services_needed")) {
          return {
            fetchAll: async () => ({
              resources: [{ service: "Web Development", count: 50 }],
            }),
          };
        }
        if (query.query.includes("GROUP BY c.source")) {
          return {
            fetchAll: async () => ({
              resources: [{ source: "Website", count: 60 }],
            }),
          };
        }
        return { fetchAll: async () => ({ resources: [15] }) };
      });

      const res = await request(app).get("/api/metrics").expect(200);

      expect(res.body).toMatchObject({
        success: true,
        total: 100,
        today: 15,
        byService: { "Web Development": 50 },
        bySource: { Website: 60 },
      });
    });

    it("should handle errors gracefully", async () => {
      container.items.query.mockImplementation(() => {
        throw new Error("DB Error");
      });

      const res = await request(app).get("/api/metrics").expect(500);

      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty("message", "Failed to fetch metrics");
    });
  });

  // ------------------ Contacts ------------------
  describe("GET /api/contacts", () => {
    it("should return contacts array", async () => {
      container.items.query.mockReturnValue({
        fetchAll: async () => ({
          resources: [
            {
              id: "1",
              name: "John Doe",
              phone_number: "+1234567890",
              email_address: "john@example.com",
              services_needed: "Web Development",
              source: "Website",
              status: "new",
            },
          ],
        }),
      });

      const res = await request(app).get("/api/contacts").expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toMatchObject({
        id: "1",
        name: "John Doe",
        services_needed: "Web Development",
        source: "Website",
      });
    });

    it("should return empty array on error", async () => {
      container.items.query.mockImplementation(() => {
        throw new Error("DB Error");
      });

      const res = await request(app).get("/api/contacts").expect(500);

      expect(res.body).toEqual([]);
    });
  });

  // ------------------ Unknown Route ------------------
  describe("Unknown routes", () => {
    it("should return 404 for invalid endpoint", async () => {
      const res = await request(app).get("/api/unknown").expect(404);
      expect(res.body).toHaveProperty("message", "Not Found");
    });
  });
});
