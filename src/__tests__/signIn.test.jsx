import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import LoginForm from "../components/login-form";
import userSlice from "../store/slices/userSlice"

import userEvent from "@testing-library/user-event";


import toast from "react-hot-toast";
import { axiosInstance } from "../axios/interceptor";
import { configureStore } from "@reduxjs/toolkit";




vi.mock("../axios/interceptor", () => ({
    axiosInstance: {
        post: vi.fn()
    }
}))

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn()
    }
}))


function renderWrapper(ui) {
    const store = configureStore({
        reducer: {
            user: userSlice
        }
    })
    return <Provider store={store}>
        <MemoryRouter>
            {ui}
        </MemoryRouter>
    </Provider>
}


describe("Login Component Testing", () => {
    beforeEach(() => {
        // render fresh before each test
        render(
            renderWrapper(<LoginForm />)
        );
    });

    afterEach(() => {
        cleanup()
        vi.clearAllMocks()
    })



    test("Email, Password and Button is present", () => {
        const emailInput = screen.getByRole("textbox", { name: /email/i });
        const passwordInput = screen.getByPlaceholderText("******");
        const button = screen.getByRole("button", { name: /login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();


        expect(emailInput).toBeRequired()
        expect(passwordInput).toBeRequired()


        expect(emailInput).toHaveValue("")
        expect(passwordInput).toHaveValue("")


    });

    test("after submitting a form user should successfully login", async () => {


        // Arrange 
        axiosInstance.post.mockResolvedValueOnce({
            status: 200,
            data: {
                message: "Logged-In",
                data: {
                    id: 1,
                    name: "Vikas"
                }
            }
        })

        // fresh render again here
        const emailInput = screen.getByRole("textbox", { name: /email/i });
        const passwordInput = screen.getByPlaceholderText("******");
        const button = screen.getByRole("button", { name: /login/i });


        // ACT 
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.type(emailInput, "vikas@gmail.com");
        await userEvent.type(passwordInput, "Vikas@123");
        await userEvent.click(button)


        // Assert 
        await waitFor(() => {
            expect(axiosInstance.post).toHaveBeenCalledWith("/sign-in", {
                email: "vikas@gmail.com",
                password: "Vikas@123"
            })
            expect(toast.success).toHaveBeenCalledWith("Logged-In")
        })


    });


    test("after submitting a login form show toast error", async () => {
        axiosInstance.post.mockRejectedValueOnce({
            response: {
                data: {
                    message: "Invalid Credentials"
                }
            }
        })

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const button = screen.getByRole("button", { name: /login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.type(emailInput, "vikas@gmail.com")
        await userEvent.type(passwordInput, "Vikas@123")
        await userEvent.click(button)


        // Assert: wait for async code to call axios and toast
        await waitFor(() => {
            expect(axiosInstance.post).toHaveBeenCalledWith("/sign-in", {
                email: "vikas@gmail.com",
                password: "Vikas@123",
            });

            // toast.error should have been called with the message from rejection
            expect(toast.error).toHaveBeenCalledWith("Invalid Credentials");
        });

    })

    test("empty submit does not call api", () => {
        const button = screen.getByRole("button", { name: /login/i })
        expect(button).toBeInTheDocument()
        userEvent.click(button)

        expect(axiosInstance.post).not.toHaveBeenCalled()
    })
});
