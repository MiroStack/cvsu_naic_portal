
const buildings = [
  {
    name: "STAR Building",
    floors: [
      {
        name: "Ground level",
        rooms: [
          "Faculty Restrooms",
          "STAR 101 | ITD (Information Technology Department) Faculty Room",
          "STAR 102 | TED (Teacher Education Department) Faculty Room",
          "STAR 103 | FASD (Fisheries and Aquatic Sciences Department) Faculty Room",
          "STAR 104 | ASD (Arts and Sciences Department) Faculty Room",
        ],
      },
      {
        name: "Second Floor",
        rooms: ["Computer Laboratory A", "Vacant Room", "Biology Laboratory", "YES Office", "Power Room"],
      },
      {
        name: "Third Floor",
        rooms: [
          "Restrooms",
          "ICT (Information and Communication Technology) Office",
          "Computer Laboratory D",
          "Computer Laboratory C",
          "Computer Laboratory B",
        ],
      },
    ],
  },
  
  {
    name: "ADMINISTRATION BUILDING",
    floors: [
      {
        name: "Ground level",
        rooms: [
          "Director For Administrative and Support Services Office",
          "Human Resource Office",
          "Accounting Office",
          "Director for Curriculum Instruction Office",
          "Cashier's Office",
          "Registrar's Office",
          "External Auditor Office",
          "Stock Room",
          "Gender and Development Office",
          "For Faculty and Staff Comfort Room (2 rooms | separate Female and Male)",
          "HM Laboratory",
          "Stock Room",
          "Supply Office",
        ],
      },
    ],
  },
  {
    name: "ACADEMIC BUILDINGS",
    floors: [
      {
        name: "No Floor",
        rooms: [
          "MD 101 Classroom",
          "MD 102 Classroom",
          "MD 103 Classroom",
          "MD 104 Classroom",
          "MD 105 Classroom",
          "Rest Room (2 room | separate female and male)",
          "Gender Neutral Restroom",
          "MD 110 Classroom",
          "MD 111 Classroom",
          "MD 107 Classroom",
          "MD 108 Classroom",
          "MD 109 Classroom",
          "MD A (Linen/Laundry) Laboratory Room | MD Laboratory A (Linen/Landry Room)",
          "Hospitality Management Stock Room A | MD Laboratory B (Stock Room)",
          "MD Laboratory C (Banquet Area)",
          "MD Laboratory D (Hot/Cold Kitchen)",
          "MD Laboratory E (Baking Area)",
          "MD Organization Office",
          "Tools & Equipment Stockroom 104",
        ],
      },
    ],
  },
  {
    name: "AquaBEST BUILDING",
    floors: [
      {
        name: "Ground level",
        rooms: [
          "EBA office",
          "Director for RDES",
          "LSHS Grade 7",
          "GRADE 8",
          "GRADE 9",
          "GRADE 10",
          "TED C (107)",
          "TED B (106)",
          "TED A (105)",
          "TED 104",
          "TED 103",
          "TED 102",
          "TED 101",
          "MD",
          "SPORTS",
        ],
      },
      {
        name: "Second Floor",
        rooms: [
          "ACCREDITATION ROOM",
          "FASD 201",
          "FASD 202",
          "FASD 203",
          "FASD 104",
          "TED 201",
          "ITD 206",
          "ITD 205",
          "ITD 204",
          "ITD 203",
          "ITD 202",
          "ITD 201",
          "CONFERENCE ROOM",
        ],
      },
    ],
  },
  {
    name: "OSAS BUILDING",
    floors: [
      {
        name: "Ground level",
        rooms: ["Guidance", "Director for student affairs and services"],
      },
      {
        name: "Second Floor",
        rooms: ["ROTC"],
      },
    ],
  },
  {
    name: "LIBRARY",
    floors: [
      {
        name: "Ground level",
        rooms: ["Audio visual room", "Thesis section"],
      },
      {
        name: "Second Floor",
        rooms: ["Library", "Librarian Office"],
      },
    ],
  },
  {
    name: "BUSINESS CENTER",
    floors: [
      {
        name: "Ground level",
        rooms: ["Infirmary", "Fitness", "Canteen", "COOP (Consumer Store)"],
      },
    ],
  },
]

const buildingsContainer = document.getElementById("buildingsContainer")
const buildingVisibility = {}

function createBuildingElement(building, index) {
  const buildingDiv = document.createElement("div")
  buildingDiv.className = "building"

  const buildingHeader = document.createElement("div")
  buildingHeader.className = "building-header"

  const buildingTitle = document.createElement("h2")
  buildingTitle.textContent = building.name

  buildingHeader.appendChild(buildingTitle)

  const toggleButton = document.createElement("button")
  toggleButton.textContent = "Show Floors"

  const floorsDiv = document.createElement("div")
  floorsDiv.className = "floors"

  building.floors.forEach((floor, floorIndex) => {
    const floorDiv = document.createElement("div")
    floorDiv.className = "floor"

    const floorName = document.createElement("h3")
    floorName.textContent = floor.name
    if (floor.name === "No Floor") {
      floorName.style.display = "none"
    }
    floorName.style.fontWeight = "bold"
    floorDiv.appendChild(floorName)

    const roomsContainer = document.createElement("div")
    roomsContainer.className = "rooms-container"

    floor.rooms.forEach((room, roomIndex) => {
      const roomDiv = document.createElement("div")
      roomDiv.className = "room"

      const roomInfo = document.createElement("div")
      roomInfo.className = "room-info"

      const roomName = document.createElement("span")
      roomName.className = "room-name"
      roomName.textContent = room

      const floorInfo = document.createElement("span")
      floorInfo.className = "room-floor"
      if (floor.name !== "No Floor") {
        floorInfo.textContent = floor.name
      }

      roomInfo.appendChild(roomName)
      roomInfo.appendChild(floorInfo)

      const iconContainer = document.createElement("div")
      iconContainer.className = "icon-container"

      const editIcon = document.createElement("ion-icon")
      editIcon.name = "create-outline"
      editIcon.className = "edit-icon"
      editIcon.addEventListener("click", (e) => {
        e.stopPropagation()
        editRoom(index, floorIndex, roomIndex)
      })

      const deleteIcon = document.createElement("ion-icon")
      deleteIcon.name = "close-circle-outline"
      deleteIcon.className = "delete-icon"
      deleteIcon.addEventListener("click", (e) => {
        e.stopPropagation()
        deleteRoom(index, floorIndex, roomIndex)
      })

      iconContainer.appendChild(editIcon)
      iconContainer.appendChild(deleteIcon)

      roomDiv.appendChild(roomInfo)
      roomDiv.appendChild(iconContainer)
      roomsContainer.appendChild(roomDiv)
    })

    floorDiv.appendChild(roomsContainer)
    floorsDiv.appendChild(floorDiv)
  })

  if (buildingVisibility[index] === undefined) {
    buildingVisibility[index] = false
  }

  if (buildingVisibility[index]) {
    floorsDiv.style.display = "block"
    toggleButton.textContent = "Hide Floors"
  } else {
    floorsDiv.style.display = "none"
    toggleButton.textContent = "Show Floors"
  }

  toggleButton.addEventListener("click", () => {
    buildingVisibility[index] = !buildingVisibility[index]
    renderBuildings()
  })

  buildingDiv.appendChild(buildingHeader)
  buildingDiv.appendChild(toggleButton)
  buildingDiv.appendChild(floorsDiv)

  return buildingDiv
}

function editRoom(buildingIndex, floorIndex, roomIndex) {
  const building = buildings[buildingIndex]
  const currentRoom = building.floors[floorIndex].rooms[roomIndex]
  const currentFloor = building.floors[floorIndex].name

  const modal = document.createElement("div")
  modal.className = "modal"

  const floorOptions = building.floors
    .map((floor, index) => `<option value="${index}" ${index === floorIndex ? "selected" : ""}>${floor.name}</option>`)
    .join("")

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Edit Room</h2>

      <label for="roomName">Room Name:</label>
      <input type="text" id="roomName" value="${currentRoom}">

      <label for="floorSelect">Floor:</label>
      <select id="floorSelect">
        ${floorOptions}
      </select>

      <div class="modal-buttons">
        <button id="saveButton">Save</button>
        <button id="cancelButton">Cancel</button>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  document.getElementById("saveButton").addEventListener("click", () => {
    const newName = document.getElementById("roomName").value.trim()
    const newFloorIndex = Number.parseInt(document.getElementById("floorSelect").value)

    if (newName !== "") {
      // Remove room from old floor
      buildings[buildingIndex].floors[floorIndex].rooms.splice(roomIndex, 1)

      // Add room to new floor
      buildings[buildingIndex].floors[newFloorIndex].rooms.push(newName)

      renderBuildings()
    }
    document.body.removeChild(modal)
  })

  document.getElementById("cancelButton").addEventListener("click", () => {
    document.body.removeChild(modal)
  })
}

function deleteRoom(buildingIndex, floorIndex, roomIndex) {
  buildings[buildingIndex].floors[floorIndex].rooms.splice(roomIndex, 1)
  renderBuildings()
}

function renderBuildings() {
  buildingsContainer.innerHTML = ""
  buildings.forEach((building, index) => {
    const buildingElement = createBuildingElement(building, index)
    buildingsContainer.appendChild(buildingElement)
  })
}

renderBuildings()

