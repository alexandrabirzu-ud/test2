const modeConfig = {
  disco: {
    label: "Disco",
    accent: "#f97316",
    challenge: "Click the disco button and verify the groove report appears."
  },
  stealth: {
    label: "Stealth",
    accent: "#22c55e",
    challenge: "Submit a codename and confirm the stealth checklist is revealed."
  },
  turbo: {
    label: "Turbo",
    accent: "#38bdf8",
    challenge: "Launch the drill and confirm the energy meter jumps above zero."
  }
};

const danceMoves = [
  "Laser Shuffle",
  "Moonwalk Loop",
  "Servo Spin",
  "Pixel Pop",
  "Circuit Slide"
];

const normalizeCodename = codename => {
  const cleaned = (codename || "")
    .trim()
    .replace(/\s+/g, " ");

  return cleaned ? cleaned.toUpperCase() : "MYSTERY BOT";
};

const buildChecklist = (normalizedCodename, mode) => [
  `Boot sequence ready for ${normalizedCodename}.`,
  `Primary mode locked to ${modeConfig[mode].label}.`,
  "Assertion target: secret phrase badge is visible on screen."
];

const buildBotDrill = (codename, requestedMode) => {
  const normalizedCodename = normalizeCodename(codename);
  const mode = modeConfig[requestedMode] ? requestedMode : "disco";
  const checksum = normalizedCodename
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const energy = (checksum % 91) + 9;
  const badge =
    energy >= 80
      ? "BOT APPROVED"
      : energy >= 45
        ? "LASER READY"
        : "GLITTER REQUIRED";
  const danceMove = danceMoves[checksum % danceMoves.length];
  const secretPhrase = `${mode.toUpperCase()}-${normalizedCodename.length}-${checksum % 17}`;

  return {
    codename: normalizedCodename,
    mode,
    modeLabel: modeConfig[mode].label,
    badge,
    accent: modeConfig[mode].accent,
    energy,
    danceMove,
    secretPhrase,
    challenge: modeConfig[mode].challenge,
    checklist: buildChecklist(normalizedCodename, mode)
  };
};

module.exports = {
  buildBotDrill
};
