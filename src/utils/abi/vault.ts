export const vaultAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "poolId",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address"
      }
    ],
    name: "PoolRegistered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenIn",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenOut",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    name: "SwapExecuted",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "poolId",
        type: "bytes32"
      }
    ],
    name: "getPool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "pools",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address"
      }
    ],
    name: "registerPool",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "poolId",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "tokenIn",
        type: "address"
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];