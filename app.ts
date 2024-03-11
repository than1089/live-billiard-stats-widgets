import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { google, sheets_v4 } from "googleapis";

const app = express();

const spreadsheetMap: Record<string, string> = {
  'singles-table-1': '1z-nZlf5s6d8fhvLcVPuO0NgmMs62mZ6besr4PhZfbx0',
  'singles-table-2': '1WE1DDl0aVArT0-QcgB48kSX42oi6ee0zJUGWSgcm8Lg',
  'teams-table-1': '1LPaOMjAslBf0m5rMKNrM2PusDge9lkLILZzWUEEti5E',
  'teams-table-2': '1ynaa5vhsD91mTj7fCCddsJioCM5f5eItog038Hnu-C0',
};

app.use(express.static(__dirname + '/client/build'));
app.get('*', (req, res) => { 
  res.sendFile(__dirname + '/client/build/index.html')
});

const auth= new google.auth.GoogleAuth({
  keyFile: './google-credentials.json',
  scopes: "https://www.googleapis.com/auth/spreadsheets", 
});

const googleService = google.sheets({
  version: 'v4',
  auth
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
let sheetsData: Partial<Record<string, {lastUpdated: Date, data: sheets_v4.Schema$Sheet[]}>> = {};

function fetData() {
  Object.keys(spreadsheetMap).forEach(table => {
    // Only get new data if having connections
    if (io.sockets.adapter.rooms.get(table)?.size) {
      fetchDataFromOneSpreadsheet(table);
    }
  });
}

function fetchDataFromOneSpreadsheet(table: string) {
  console.log(`fetching data from ${table}`);
  googleService.spreadsheets.get({
    spreadsheetId: spreadsheetMap[table],
    ranges: ["PBS_MAIN_PAGE!A1:M28"],
    includeGridData: true
  }).then((result) => {
    if (result.data.sheets && result.data.sheets.length) {
      sheetsData[table] = {
        lastUpdated: new Date(),
        data: result.data.sheets
      }
      io.to(table).emit("PBS_MAIN_PAGE-UPDATE", result.data.sheets[0]);
    }
  }).catch((err) => {
    console.warn(err);
  });
}

io.on("connection", (socket) => {
  socket.on("connectToTable", (table) => {
    if (!spreadsheetMap[table]) {
      return;
    }
    socket.join(table);
    // If having data and data is 20s old, refetch new data. Otherwise fetch new data
    if (sheetsData[table]) {
      const lastUpdated = (new Date()).getTime() - Number(sheetsData[table]?.lastUpdated.getTime());
      if (lastUpdated > 20000) {
        fetchDataFromOneSpreadsheet(table);
      } else {
        socket.emit('PBS_MAIN_PAGE-UPDATE', sheetsData[table]?.data[0]);
      }
    } else {
      fetchDataFromOneSpreadsheet(table);
    }
  });
});

setInterval(() => {
  fetData();
}, 8000);

const port = process.env.PORT || 4004;
httpServer.listen(port, () => {
  console.log("Running at localhost:4004");
});
