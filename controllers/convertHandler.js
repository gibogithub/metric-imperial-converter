function ConvertHandler() {
  const unitMap = {
    gal: { returnUnit: "L", factor: 3.78541, spelledOut: "gallons" },
    l:   { returnUnit: "gal", factor: 1 / 3.78541, spelledOut: "liters" },
    lbs: { returnUnit: "kg", factor: 0.453592, spelledOut: "pounds" },
    kg:  { returnUnit: "lbs", factor: 1 / 0.453592, spelledOut: "kilograms" },
    mi:  { returnUnit: "km", factor: 1.60934, spelledOut: "miles" },
    km:  { returnUnit: "mi", factor: 1 / 1.60934, spelledOut: "kilometers" },
  };

  this.getNum = function (input) {
    const result = input.match(/^[\d/.]+/);
    if (!result) return 1;

    const numStr = result[0];
    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return "invalid number";

    try {
      return eval(numStr);
    } catch {
      return "invalid number";
    }
  };

  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return "invalid unit";
    let unit = result[0].toLowerCase();
    if (unit === "l") unit = "l";
    if (!unitMap[unit]) return "invalid unit";
    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase();
    return unitMap[unit] ? unitMap[unit].returnUnit : "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    const key = unit.toLowerCase();
    return unitMap[key] ? unitMap[key].spelledOut : "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const unit = initUnit.toLowerCase();
    const factor = unitMap[unit]?.factor;
    return factor ? parseFloat((initNum * factor).toFixed(5)) : "invalid number";
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
