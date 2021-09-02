import express from "express";
8;
import authentication from "../utils.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const spreadsheetId = process.env.SPREADSHEET_ID;

// @desc    Create a new user
// @route   POST /users
// @access  Public
router.post("/", async (req, res) => {
  // Destructures the sheet data after it has been authenticated
  const { sheets } = await authentication();

  const { name, country, position, salary } = req.body;

  // Write data into the google sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:D", // Sheet name and range of cells
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name, country, position, salary]],
    },
  });
});

// @desc    Gets all users from sheet
// @route   GET /users
// @access  Public
router.get("/", async (req, res) => {
  // Destructures the sheet data after it has been authenticated
  const { sheets } = await authentication();

  const readData = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:D",
  });

  res.send(readData.data);
});

export default router;
