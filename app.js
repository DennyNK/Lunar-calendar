async function fetchLunarData(latitude, longitude) {
    const url = `https://luna-phase.p.rapidapi.com/Luna_Phase?lat=${latitude}&lon=${longitude}&timestamp=1713685356`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0aea8df65cmsh96db9aa11186161p13c182jsn8479adb086b0',
            'x-rapidapi-host': 'luna-phase.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Parse response as JSON
        return result; // Return the parsed result
    } catch (error) {
        console.error("Error fetching lunar data:", error);
        return null; // Return null to indicate failure
    }
}



async function renderLunarCalendar() {
    const lunarCalendarEl = document.getElementById("lunar-calendar");
    if (!lunarCalendarEl) return; // Skip if no container is found
  
    lunarCalendarEl.textContent  = "Loading lunar calendar..."; // Loading state
  
    try {
        // Fetch lunar data for Sofia
        const lunarData = await fetchLunarData(42.6977, 23.3219); // Sofia coordinates
        
        if (!lunarData) {
            lunarCalendarEl.textContent = "Failed to load lunar data.";
            return;
        }

        lunarCalendarEl.textContent = "";

        const heading = document.createElement("h3");
        heading.textContent = "Lunar Calendar";
        lunarCalendarEl.appendChild(heading);

        const table = document.createElement("table");

        const headerRow = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.textContent = "Description";
        const th2 = document.createElement("th");
        th2.textContent = "Phase";
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        table.appendChild(headerRow);

        const dataRow = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = lunarData.Phase_Description || "Unknown";
        const td2 = document.createElement("td");
        td2.textContent = lunarData.Phase || "Unknown";
        dataRow.appendChild(td1);
        dataRow.appendChild(td2);
        table.appendChild(dataRow);

        lunarCalendarEl.appendChild(table);

        // Extract the necessary fields
        // const phaseDescription = lunarData.Phase_Description || "Unknown";
        // const phase = lunarData.Phase || "Unknown";

        
    } catch (error) {
        console.error("Error loading lunar calendar:", error);
        lunarCalendarEl.textContent = "Error loading lunar data.";
    }
}

  

renderLunarCalendar();