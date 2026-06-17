import { describe, it, expect } from "vitest";
import { scrambleStep } from "./useScramble";

describe("scrambleStep", () => {
  it("reveals more characters as progress increases", () => {
    const target = "HELLO";
    const early = scrambleStep(target, 0.2);
    const late = scrambleStep(target, 0.8);
    const revealed = (s: string) => s.split("").filter((c, i) => c === target[i]).length;
    expect(revealed(late)).toBeGreaterThanOrEqual(revealed(early));
  });
  it("returns the exact target at progress 1", () => {
    expect(scrambleStep("SHIP", 1)).toBe("SHIP");
  });
  it("preserves spaces", () => {
    expect(scrambleStep("A B", 1)).toBe("A B");
  });
});
