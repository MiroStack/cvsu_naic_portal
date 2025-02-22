const sampleBuilding = {
  name: "Main Building",
  description: "This is the main building of the campus, housing various rooms across multiple floors.",
  rooms: [
    { name: "Room 101", floor: "Ground Floor" },
    { name: "Room 102", floor: "Ground Floor" },
    { name: "Room 301", floor: "Second Floor" },
    { name: "Room 302", floor: "Second Floor" },
    { name: "Room 401", floor: "Third Floor" },
    { name: "Room 402", floor: "Third Floor" },
  ],
}

// Function to populate form with existing building data
function populateBuildingData() {
  document.getElementById("buildingName").value = sampleBuilding.name
  document.getElementById("buildingDescription").value = sampleBuilding.description

  // Populate rooms list
  const roomsList = document.getElementById("roomsList")
  roomsList.innerHTML = "" // Clear existing rooms
  sampleBuilding.rooms.forEach((room) => {
    addRoomInput(room.floor ? room : { ...room, floor: "No Floor" })
  })
}

// Function to add a room input
function addRoomInput(room = { name: "", floor: "Ground Floor" }) {
  const roomsList = document.getElementById("roomsList")
  const roomDiv = document.createElement("div")
  roomDiv.classList.add("room-item")
  roomDiv.innerHTML = `
          <input type="text" class="room-input" value="${room.name}" placeholder="Room name">
          <select class="floor-select">
              <option value="No Floor" ${room.floor === "No Floor" ? "selected" : ""}>No Floor</option>
              <option value="Ground Floor" ${room.floor === "Ground Floor" ? "selected" : ""}>Ground Floor</option>
              <option value="Second Floor" ${room.floor === "Second Floor" ? "selected" : ""}>Second Floor</option>
              <option value="Third Floor" ${room.floor === "Third Floor" ? "selected" : ""}>Third Floor</option>
          </select>
          <ion-icon name="close-circle" class="delete-room-icon"></ion-icon>`
  roomsList.appendChild(roomDiv)
}

// Call the function to populate data on page load
document.addEventListener("DOMContentLoaded", populateBuildingData)

// Add room input dynamically when the "Add Room" button is clicked
document.getElementById("addRoomBtn").addEventListener("click", () => addRoomInput())

// Handle room deletion
document.getElementById("roomsList").addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("delete-room-icon")) {
    event.target.closest(".room-item").remove()
  }
})

// Handle form submission
document.getElementById("editBuildingForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const buildingName = document.getElementById("buildingName").value
  const buildingDescription = document.getElementById("buildingDescription").value
  const rooms = Array.from(document.querySelectorAll(".room-item"))
    .map((item) => {
      const name = item.querySelector(".room-input").value
      const floor = item.querySelector(".floor-select").value
      return floor === "No Floor" ? { name } : { name, floor }
    })
    .filter((room) => room.name.trim() !== "")

  // Logic to save the changes (this can be an API call in a real app)
  console.log("Updated Building Name:", buildingName)
  console.log("Updated Building Description:", buildingDescription)
  console.log("Updated Rooms:", rooms)

  // Simulate saving the updated data
  sampleBuilding.name = buildingName
  sampleBuilding.description = buildingDescription
  sampleBuilding.rooms = rooms

  alert("Building information updated successfully!")
})

// Handle building deletion
document.getElementById("deleteBuildingBtn").addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to delete this building?")
  if (confirmation) {
    // Logic to delete the building (e.g., API call)
    console.log("Building deleted.")
    alert("Building deleted successfully!")
    // Redirect to dashboard or handle accordingly
  }
})

