import {fetchDesignations} from "../api/getDesignation/getDesignation"

globalThis.serverDataCache = globalThis.serverDataCache || null;

async function fetchDataFromDatabase() {
  try {
    // Call the local function instead of making an HTTP request
    const data=  await fetchDesignations();
    const formattedData = data.map(item => ({
      id: item.id,
      designation: item.designation || 'Unknown',  // Provide a default value if designation is missing
      createdAt: new Date(data.createdAt.seconds * 1000),
    }));
    console.log("Data fetched from Firebase:",formattedData);

    return formattedData; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from database:", error);
    throw error;
  }
}






export async function initializeServerData() {
    if (!globalThis.serverDataCache) {
      globalThis.serverDataCache = await fetchDataFromDatabase();
      console.log("Server cache initialized:", globalThis.serverDataCache);
    }
    return globalThis.serverDataCache;
  }
  
  export function getServerData() {
    return globalThis.serverDataCache;
  }

   
  export function deleteServerData() {
    delete globalThis.serverDataCache;
  }