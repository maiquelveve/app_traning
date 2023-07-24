import { generateToken } from "../../../../src/helpers";

describe("HELPERS - Token Helpers", () => {
  it("it should be possible to generator a token",  async () => {
    const token = generateToken({ id: 1 });

    expect(typeof token).toBe("string");
    expect(token).toHaveLength(151);
  });
});
