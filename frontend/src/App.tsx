import { AppBar } from "./components/AppBar";
import { TaskCard } from "./components/TaskCard";
import { Dialog } from "./components/Dialog";

export default function App() {
  return (
    <div className="">
      <div className="">
        <AppBar />
      </div>
      <div className="flex justify-between items-center mx-12 mt-8 border-b pb-4">
        <div className="text-5xl text-black font-semibold ">
          TODO
        </div>
        <div>
          <Dialog />
        </div>
      </div>
      <div className="grid grid-cols-1 mx-12 lg:grid-cols-3">
        <TaskCard />
      </div>
    </div>
  )
}