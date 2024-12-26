import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const pools = [
  {
    pool: "USDC/ETH",
    platform: "Uniswap",
    tvl: "$33",
    volume: "$888"
  },
  {
    pool: "DAI/USDT",
    platform: "SushiSwap",
    tvl: "$50",
    volume: "$1200"
  },
  {
    pool: "WBTC/ETH",
    platform: "Balancer",
    tvl: "$70",
    volume: "$1500"
  },
  {
    pool: "MATIC/USDC",
    platform: "PancakeSwap",
    tvl: "$20",
    volume: "$400"
  }
];

export default function Pools() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Pools</h1>
      <div className="rounded-md border w-full overflow-hidden">
        
        <Table>
          <TableCaption>
            A list of DeFi pools with their statistics.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Pool</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>TVL</TableHead>
              <TableHead>Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pools.map((pool, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{pool.pool}</TableCell>
                <TableCell>{pool.platform}</TableCell>
                <TableCell>{pool.tvl}</TableCell>
                <TableCell>{pool.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-center font-medium">
                End of Data
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
