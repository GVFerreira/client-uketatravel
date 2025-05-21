import SolicitationDetailsComponent from "./solicitation";

type paramsType = Promise<{ id: string }>;

export default async function SolicitationDetails(props: { params: paramsType}) {
  const { id } = await props.params

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border shadow-sm rounded-lg px-6">
        <SolicitationDetailsComponent id={id}/>
      </div>
    </main>
  )
}
