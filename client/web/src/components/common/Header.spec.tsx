import "@tests/mocks/next/routerMock";
import { render } from "@testing-library/react";
import { Header } from "./Header";

jest.mock("next/router");

describe("Header test", () => {
	it("should be able to use header", async () => {
		const component = render(<Header/>);
		const menu = component.getByTestId("menu-link-home");
		console.log(menu);
	});
});
