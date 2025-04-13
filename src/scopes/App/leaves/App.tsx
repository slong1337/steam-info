import { Outlet } from "@remix-run/react"

export function App() {

    return (
        <>
            <h1 className="text-2xl px-4">SteamInfo</h1>
            <Outlet/>
        </>
    )

}
