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
    const type = detectField(input);
    if (type && data[type]) {
      input.value = data[type];
    }
  });
}

// Listen for trigger
api.runtime.onMessage.addListener((req) => {
  if (req.action === "autofill") {
    api.storage.local.get("profiles").then((res) => {
      const profiles = res.profiles || {};
      const first = Object.values(profiles)[0];
      if (first) autofill(first);
    });
  }
});