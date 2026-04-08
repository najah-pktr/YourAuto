const profileSelect = document.getElementById("profileSelect");

// Load profiles
function loadProfiles() {
  chrome.storage.local.get("profiles", (res) => {
    const profiles = res.profiles || {};

    profileSelect.innerHTML = "";

    Object.keys(profiles).forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      profileSelect.appendChild(option);
    });

    loadSelectedProfile();
  });
}

// Load selected profile data
function loadSelectedProfile() {
  const key = profileSelect.value;

  chrome.storage.local.get("profiles", (res) => {
    const data = res.profiles?.[key];
    if (!data) return;

    name.value = data.name || "";
    email.value = data.email || "";
    phone.value = data.phone || "";
  });
}

// Save profile
document.getElementById("save").onclick = () => {
  const key = profileSelect.value || "default";

  chrome.storage.local.get("profiles", (res) => {
    const profiles = res.profiles || {};

    profiles[key] = {
      name: name.value,
      email: email.value,
      phone: phone.value
    };

    chrome.storage.local.set({ profiles }, () => {
      alert("Saved!");
    });
  });
};

// Create new profile
document.getElementById("newProfile").onclick = () => {
  const name = prompt("Enter profile name:");
  if (!name) return;

  chrome.storage.local.get("profiles", (res) => {
    const profiles = res.profiles || {};
    profiles[name] = {};

    chrome.storage.local.set({ profiles }, loadProfiles);
  });
};

profileSelect.addEventListener("change", loadSelectedProfile);

loadProfiles();
