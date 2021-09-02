import { google } from "googleapis";

const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json",
    scopes: process.env.SCOPE,
  });

  // Auth client object
  const authClientObject = await auth.getClient();

  // Our Google Sheet
  const sheets = google.sheets({ version: "v4", auth: authClientObject });

  return { sheets };
};

export default authentication;
