import { Outlet } from "react-router";

import NavHeader from "../assets/NavHeader.svg";
import Background from "../assets/Background.png";

export function AuthLayout() {
    return (
        <div className="w-screen h-screen flex justify-end items-start bg-cover bg-center"
            style={{
                backgroundImage: `url(${Background})`,
            }}>

            <main className="bg-white flex flex-col px-30 rounded-tl-xl w-[680px] mt-5"
                style={{
                    height: 'calc(100vh - 20px)'// 20px = mt-5 (~pt-5)
                }}>

                <img src={NavHeader} alt="logo" className="my-14 w-40 h-10 mx-auto" />
                <Outlet />

            </main>

        </div>
    )
}

