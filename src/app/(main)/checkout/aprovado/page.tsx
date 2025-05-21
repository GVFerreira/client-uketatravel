
import { Suspense } from "react"

import HeaderCKT from "../components/header"
import FooterCKT from "../components/footer"
import { ApprovedContent } from "./approved"

export default function Approved() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderCKT />
      <main className=" flex-1 flex items-center justify-center py-12 px-4 md:px-6">
        <Suspense fallback={<div>Carregando...</div>}>
          <ApprovedContent />
        </Suspense>
      </main>
      <FooterCKT />
    </div>
  )
}