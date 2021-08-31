import express from "express";
import { google } from "googleapis";

const router = express.Router();

const spreadsheetId = "1jKUf5Ru8oQX18mhjVc4g9GowjK__EghDHjrY2obi7V4";

const auth = new google.auth.GoogleAuth({
  keyFile: "keys.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// Auth client object
const authClientObject = await auth.getClient();

// Our Google Sheet
const googleSheet = google.sheets({ version: "v4", auth: authClientObject });

router.post("/", async (req, res) => {
  const { name, country, position, salary } = req.body;

  // Write data into the google sheet
  await googleSheet.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:D", // Sheet name and range of cells
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name, country, position, salary]],
    },
  });
});

router.get("/", async (req, res) => {
  const readData = await googleSheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:D",
  });

  res.send(readData.data);
});

export default router;
