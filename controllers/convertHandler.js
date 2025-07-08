const unitsMap = {
  gal: { returnUnit: "L", factor: 3.78541, spellOut: "gallons" },
  L: { returnUnit: "gal", factor: 1 / 3.78541, spellOut: "liters" },
  mi: { returnUnit: "km", factor: 1.60934, spellOut: "miles" },
  km: { returnUnit: "mi", factor: 1 / 1.60934, spellOut: "kilometers" },
  lbs: { returnUnit: "kg", factor: 0.453592, spellOut: "pounds" },
  kg: { returnUnit: "lbs", factor: 1 / 0.453592, spellOut: "kilograms" },
};

function parseNumber(input) {
  let num = input.match(/^[\d/.]+/);
  if (!num) return 1;

  if ((num[0].match(/\//g) || []).length > 1) return "invalid number";

  try {
    return eval(num[0]);
  } catch (err) {
    return "invalid number";
  }
}

function parseUnit(input) {
  let result = input.match(/[a-zA-Z]+$/);
  if (!result) return "invalid unit";
  let unit = result[0].toLowerCase();
  if (unit === "l") unit = "L"; // uppercase L
  return unitsMap[unit] ? unit : "invalid unit";
}

function ConvertHandler() {
  this.getNum = parseNumber;
  this.getUnit = parseUnit;

  this.getReturnUnit = (initUnit) => {
    return unitsMap[initUnit]?.returnUnit || "invalid unit";
  };

  this.spellOutUnit = (unit) => {
    return unitsMap[unit]?.spellOut || "invalid unit";
  };

  this.convert = (initNum, initUnit) => {
    return Number((initNum * unitsMap[initUnit].factor).toFixed(5));
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
