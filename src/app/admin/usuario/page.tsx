import AddUser from "./components/add-user"
import UserListWrapper from "./components/users"

export default function Destino() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Usuários</h1>
        <AddUser />
      </div>
      <div className="border shadow-sm rounded-lg">
        <UserListWrapper />
      </div>
    </main>
  )
}