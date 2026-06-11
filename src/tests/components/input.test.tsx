import { describe, expect, it, vi } from "vitest";
import Input from "../../components/Input";
import { render, screen } from "@testing-library/react"

describe("Input Component", () =>{
    it("match snapshot", () =>{
        const { container } = render(<Input type="text" label="Text Input" placeholder="input-placeholder" isRequired={true} onChange={vi.fn()} autoFocus={true}/>)
        expect(container).toMatchSnapshot()
    })

    it("should render an input with the provided id, type and placeholder", () => {
        render(
        <Input type="text" label="username" placeholder="Enter Username" isRequired={true} onChange={vi.fn()} autoFocus={true }/>
    );

    screen.debug();
        const input = screen.getByPlaceholderText("Enter Username");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("name", "username");
        expect(input).toHaveAttribute("type", "text");
    })
})