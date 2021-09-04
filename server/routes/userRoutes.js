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

  const { id, name, country, position, salary } = req.body;

  // Write data into the google sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:E", // Sheet name and range of cells
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[id, name, country, position, salary]],
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
    range: "Sheet1!A2:E",
  });

  res.send(readData.data);
});

// @desc    Update a users info
// @route   POST /users
// @access  Public
router.post("/update", async (req, res) => {
  // Destructures the sheet data after it has been authenticated
  const { sheets } = await authentication();

  const { indexToUpdate, id, name, country, position, salary } = req.body;

  // Write data into the google sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Sheet1!A${indexToUpdate}:E${indexToUpdate}`, // Sheet name and range of cells
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[id, name, country, position, salary]],
    },
  });

  res.status(200);
});

// @desc    Update a users info
// @route   POST /users
// @access  Public
router.post("/delete", async (req, res) => {
  // Destructures the sheet data after it has been authenticated
  const { sheets } = await authentication();

  const { indexToUpdate } = req.body;

  // Write data into the google sheet
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: "ROWS",
              startIndex: indexToUpdate,
              endIndex: indexToUpdate,
            },
          },
        },
      ],
    },
  });
});

export default router;
