function detectField(input) {
  const str = (
    (input.name || "") +
    (input.id || "") +
    (input.placeholder || "")
  ).toLowerCase();

  if (str.match(/name|fullname|username/)) return "name";
  if (str.match(/email|mail/)) return "email";
  if (str.match(/phone|mobile|tel/)) return "phone";

  return null;
}

function autofill(data) {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    const fieldType = detectField(input);

    if (fieldType && data[fieldType]) {
      input.value = data[fieldType];
    }
  });
}

// AUTO RUN when page loads
chrome.storage.local.get("profiles", (res) => {
  const profiles = res.profiles || {};
  const firstProfile = Object.values(profiles)[0];

  if (firstProfile) {
    autofill(firstProfile);
  }
});
