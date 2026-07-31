const chai = require("chai");

const { buildBotDrill } = require("../src/gimmick");

chai.should();

describe("buildBotDrill", () => {
  it("returns deterministic bot drill data for a codename and mode", () => {
    const result = buildBotDrill("spark muffin", "turbo");

    result.codename.should.equal("SPARK MUFFIN");
    result.mode.should.equal("turbo");
    result.modeLabel.should.equal("Turbo");
    result.badge.should.be.a("string");
    result.energy.should.be.within(9, 99);
    result.danceMove.should.be.a("string");
    result.secretPhrase.should.equal("TURBO-12-3");
    result.checklist.should.have.length(3);
  });

  it("falls back to the default mode and codename", () => {
    const result = buildBotDrill("", "unknown");

    result.codename.should.equal("MYSTERY BOT");
    result.mode.should.equal("disco");
  });
});
