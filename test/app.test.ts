import supertest from "supertest";
import app, { server } from "../src/server";
import { setUpDB } from "../src/config/database";

const api = supertest(app);

describe("Get And posts Brands", () => {
  beforeAll(async () => {
    setUpDB();
  });
  it("should return all the brands", async () => {
    const res = await api
      .get("/brands")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should return the new brand info", async () => {
    const res = await api
      .post("/brands")
      .send({
        name: "Changan",
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body.name).toBeDefined();
  });
  it("should return 409 errcon conflict on duplicated brand", async () => {
    const res = await api
      .post("/brands")
      .send({
        name: "Changan",
      })
      .expect(409);
  });
  afterAll(async () => {
    server.close();
  });
});
