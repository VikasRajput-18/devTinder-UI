import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import { afterEach, describe, expect, test, vi } from "vitest"

import { render, screen, waitFor } from "@testing-library/react"
import { axiosInstance } from "../axios/interceptor"



vi.mock("../axios/interceptor", () => ({
    axiosInstance: {
        get: vi.fn(),
        post: vi.fn()
    }
}))

vi.mock("../components/profile-skeleton", () => ({
    ProfileSkeleton: () => <div data-testid="profile-skeleton">ProfileSkeleton</div>
}))

vi.mock("../components/profile-card", () => ({
    __esModule: true,
    defualt: () => <div data-testid="profile-card">Profile Card</div>
}))


import Home from "../pages/Home"
import feedSlice from "../store/slices/feedSlice"

function renderWithStore(ui) {
    const store = configureStore({ reducer: { feed: feedSlice } });
    return {
        store,
        ...render(
            <Provider store={store}>
                <MemoryRouter>{ui}</MemoryRouter>
            </Provider>
        ),
    };
}

afterEach(() => {
    vi.clearAllMocks();
});

// Initial loading state — jab data fetch ho raha ho, ProfileSkeleton dikhna chahiye.
describe("User feed page testing", () => {


    test("Homepage - initial loading shows ProfileSkeleton then No Profile Found", async () => {
        let resolveGet;
        const getPromise = new Promise((res) => {
            resolveGet = res
        })

        axiosInstance.get.mockReturnValueOnce(getPromise);

        renderWithStore(<Home />);



        expect(axiosInstance.get).toHaveBeenCalledWith("/user/feed", {
            params: {
                page: 1,
                limit: 10
            }
        })



        const skeleton = await screen.findByTestId("profile-skeleton");
        expect(skeleton).toBeInTheDocument()


        resolveGet({
            status: 200,
            data: {
                users: [],
                page: 1,
                totalPages: 1
            }
        })

        await waitFor(() => {
            expect(screen.getByText(/no profile found/i)).toBeInTheDocument()
        })



    })
})

// No profiles — agar API empty array return kare to “No Profile Found” dikhna chahiye.

// Profiles rendered — agar profiles available hain, ProfileCard (ya uska placeholder) render ho.

// Send connection request success — jab user accept/ignore click kare, axios.post call ho, success toast show ho, and removeUserFromFeed dispatch ho after animation delay.

// Send connection request error — API error -> toast.error called and loading state resets.

// Pagination — jab profiles.length chhota ho (<=3) and page < totalPages, component next page fetch kare (i.e. axios.get called with page+1).

// isFetchingNextPage UI — when fetching next page true, “Loading more profiles...” visible.

// Edge cases — repeated clicks disabled while connectionRequestLoading true.