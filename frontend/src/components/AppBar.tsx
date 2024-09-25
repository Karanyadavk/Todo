export const AppBar = () => {
    return (
        <nav className="block w-full max-w-screen-xl px-8 py-4 mx-auto text-white bg-black shadow-md rounded-md mt-10">
                <div className="container flex flex-wrap items-center justify-between mx-auto text-white">
                    <a href="#"
                    className="mr-4 block cursor-pointer py-1.5 text-lg text-white font-semibold">
                        TASKIFY
                    </a>
                    <div className="hidden lg:block">
                        <div className="flex items-center hover:cursor-pointer">
                            Login
                        </div>
                    </div>
                </div>
            </nav>
    )
}