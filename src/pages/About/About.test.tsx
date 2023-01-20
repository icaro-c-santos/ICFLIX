import { About } from "./About";
import renderer from "react-test-renderer";
it("Matches DOM Snapshot", () => {
  const domTree = renderer.create(<About></About>).toJSON();
  expect(domTree).toMatchSnapshot();
});
