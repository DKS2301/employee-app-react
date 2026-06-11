import { describe, expect, it, vi } from "vitest";
import Layout from "../../components/Layout";
import { render, screen } from "@testing-library/react"

describe("Layout Component", () =>{
    it("match snapshot", () =>{
        const { container } = render(<Layout><div>Hello</div></Layout>)
        expect(container).toMatchSnapshot()
    })
})