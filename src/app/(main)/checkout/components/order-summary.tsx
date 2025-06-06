import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderSummary() {
  const orderItems = [
    { id: 1, name: "Taxa do Governo", price: 12.9 },
    { id: 2, name: "Outras taxas", price: 47 },
  ]

  const total = orderItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Resumo da compra</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(item.price)}</p>
            </div>
          ))}

          <hr />

          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(total)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
