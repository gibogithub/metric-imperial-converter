const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  test("Whole number input", () => assert.equal(convertHandler.getNum("32L"), 32));
  test("Decimal input", () => assert.equal(convertHandler.getNum("3.5mi"), 3.5));
  test("Fractional input", () => assert.equal(convertHandler.getNum("1/2km"), 0.5));
  test("Fraction + decimal input", () => assert.equal(convertHandler.getNum("4.5/3kg"), 1.5));
  test("Double fraction", () => assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number"));
  test("Default to 1", () => assert.equal(convertHandler.getNum("kg"), 1));

  test("Valid units", () => {
    ["gal", "L", "mi", "km", "lbs", "kg"].forEach((unit) => {
      assert.equal(convertHandler.getUnit(`1${unit}`), unit);
    });
  });

  test("Invalid unit", () => {
    assert.equal(convertHandler.getUnit("32g"), "invalid unit");
  });

  test("Return unit", () => {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
  });

  test("Spell out", () => {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
  });

  test("Convert gal to L", () => {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1);
  });
});
