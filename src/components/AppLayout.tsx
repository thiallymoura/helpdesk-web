import { Outlet } from "react-router";
import { SideBar } from "./SideBar";

export function AppLayout() {
    return (
        <div className="w-screen h-screen flex bg-gray-100">
            <SideBar />

            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    )
}