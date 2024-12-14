import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {/* Saldo em R$ */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Saldo em R$</h1>
        <p className="text-4xl font-extrabold text-green-600">R$ 10.000,00</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Saldo Crypto */}
        <Card>
          <CardHeader>
            <CardTitle>Saldo Crypto</CardTitle>
            <CardDescription>Total de ativos em criptomoedas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">10.5 BTC</p>
            <p className="text-gray-500">~ R$ 1.200.000,00</p>
          </CardContent>
          <CardFooter>
            <p>Última atualização: 1 hora atrás</p>
          </CardFooter>
        </Card>

        {/* Card 2: Saldo Fiat */}
        <Card>
          <CardHeader>
            <CardTitle>Saldo Fiat</CardTitle>
            <CardDescription>
              Total disponível em moeda fiduciária
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">R$ 50.000,00</p>
            <p className="text-gray-500">Conta bancária</p>
          </CardContent>
          <CardFooter>
            <p>Última atualização: 30 minutos atrás</p>
          </CardFooter>
        </Card>

        {/* Card 3: Empréstimos */}
        <Card>
          <CardHeader>
            <CardTitle>Empréstimos</CardTitle>
            <CardDescription>
              Valores de empréstimos em andamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">R$ 5.000,00</p>
            <p className="text-gray-500">Taxa de juros: 2% ao mês</p>
          </CardContent>
          <CardFooter>
            <p>Próximo pagamento: 15/12/2024</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
