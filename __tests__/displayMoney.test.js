import { formatMoney } from "../src/components/DisplayMoney";

describe("display money component", () => {
  it("works with whole euros", () => {
    expect(formatMoney(1)).toEqual("€1.00");
    expect(formatMoney(1)).toEqual("€1.00");
    expect(formatMoney(140)).toEqual("€140.00");
  });

  it("works with fractional euros", () => {
    expect(formatMoney(140.21)).toEqual("€140.21");
    expect(formatMoney(525.25)).toEqual("€525.25");
  });
});
