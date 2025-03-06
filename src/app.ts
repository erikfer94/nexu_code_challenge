import { setUpDB } from "./config/database";
import { setupServer } from "./server";

export default async function app() {
  try {
    await setUpDB();
    setupServer();
  } catch (err) {
    console.error(err);
  }
}

app();
