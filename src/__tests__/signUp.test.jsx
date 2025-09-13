

import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import RegisterForm from "../components/register-form"

import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import userSlice from "../store/slices/userSlice"

import { configureStore } from "@reduxjs/toolkit"
import { axiosInstance } from "../axios/interceptor"
import userEvent from "@testing-library/user-event"
import toast from "react-hot-toast"



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

function registerFormFields() {
    return {
        firstName: screen.getByTestId(/firstName/i),
        lastName: screen.getByTestId(/lastname/i),
        email: screen.getByPlaceholderText(/m@example.com/i),
        password: screen.getByLabelText(/password/i),
        button: screen.getByRole("button", { name: /register/i }),
    }
}


async function fillRegisterForm({ firstName, lastName, email, password }) {
    const inputs = registerFormFields();

    await userEvent.type(inputs.firstName, firstName)
    await userEvent.type(inputs.lastName, lastName)
    await userEvent.type(inputs.email, email)
    await userEvent.type(inputs.password, password)

    return inputs
}


describe("Register Form Testing", () => {

    beforeEach(() => {
        render(renderWrapper(<RegisterForm />))
    })

    afterEach(() => {
        cleanup()
        vi.clearAllMocks()
    })

    test("Check firstName, lastName , email, password and button is present and is required", () => {

        const { firstName, lastName, email, password, button } = registerFormFields();

        [firstName, lastName, email, password, button].forEach((item) => expect(item).toBeInTheDocument());

        [firstName, lastName, email, password].forEach((item) => expect(item).toBeRequired());

        [firstName, lastName, email, password].forEach((item) => expect(item).toHaveValue(""))

    })


    test("after submitting register form user should get success toast message", async () => {

        axiosInstance.post.mockResolvedValueOnce({
            status: 201,
            data: {
                message: "Registered Successfully",
            }
        })


        const inputs = await fillRegisterForm({
            firstName: "Vikas",
            lastName: "Rajput",
            email: "vikas@gmail.com",
            password: "Vikas@123"
        })

        await userEvent.click(inputs.button)


        await waitFor(() => {
            expect(axiosInstance.post).toHaveBeenCalledWith("/sign-up", {
                firstName: "Vikas",
                lastName: "Rajput",
                email: "vikas@gmail.com",
                password: "Vikas@123",
            })

            expect(toast.success).toHaveBeenCalledWith("Registered Successfully")

        })


        // finally assert fields cleared
        const fields = [inputs.firstName, inputs.lastName, inputs.email, inputs.password];
        fields.forEach(el => expect(el).toHaveValue("")); // safe because inputs exists


    })
    test("after submitting register form user should get error toast message", async () => {

        axiosInstance.post.mockRejectedValueOnce({
            response: {
                data: {
                    message: "Already Exists",
                }
            }
        })



        const inputs = await fillRegisterForm({
            firstName: "Vikas",
            lastName: "Rajput",
            email: "vikas@gmail.com",
            password: "Vikas@123"
        })


        await userEvent.click(inputs.button)


        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Already Exists")
        })


    })

    test("empty submit does not call api", () => {
        const { button } = registerFormFields()
        userEvent.click(button)
        expect(axiosInstance.post).not.toHaveBeenCalled()
    })
})