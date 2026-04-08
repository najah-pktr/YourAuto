const api = typeof browser !== "undefined" ? browser : chrome;

const profileSelect = document.getElementById("profileSelect");

// Load profiles
function loadProfiles() {
  api.storage.local.get("profiles").then((res) => {
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

// Load selected profile
function loadSelectedProfile() {
  const key = profileSelect.value;

  api.storage.local.get("profiles").then((res) => {
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

  api.storage.local.get("profiles").then((res) => {
    const profiles = res.profiles || {};

    profiles[key] = {
      name: name.value,
      email: email.value,
      phone: phone.value
    };

    api.storage.local.set({ profiles }).then(() => {
      alert("Saved!");
    });
  });
};

// New profile
document.getElementById("newProfile").onclick = () => {
  const name = prompt("Profile name:");
  if (!name) return;

  api.storage.local.get("profiles").then((res) => {
    const profiles = res.profiles || {};
    profiles[name] = {};

    api.storage.local.set({ profiles }).then(loadProfiles);
  });
};

profileSelect.addEventListener("change", loadSelectedProfile);

loadProfiles();