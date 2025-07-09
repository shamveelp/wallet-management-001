"use client"

import { useState } from "react"
import { BrowserProvider, formatEther } from "ethers"
import Profile from "./components/Profile"
import NetworkSwitcher from "./components/NetworkSwitcher"
import WalletCard from "./components/WalletCard"
import "./App.css"

const NETWORKS = {
  ethereum: {
    chainId: "0x1",
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
  },
  bsc: {
    chainId: "0x38",
    name: "BSC",
    symbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorer: "https://bscscan.com",
  },
  polygon: {
    chainId: "0x89",
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com",
  },
}

function App() {
  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState("")
  const [currentNetwork, setCurrentNetwork] = useState("")
  const [balance, setBalance] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState("")

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask to continue")
      return
    }

    setIsConnecting(true)
    setError("")

    try {
      const ethProvider = new BrowserProvider(window.ethereum)
      const signer = await ethProvider.getSigner()
      const userAddress = await signer.getAddress()
      const networkInfo = await ethProvider.getNetwork()
      const userBalance = await ethProvider.getBalance(userAddress)

      setProvider(ethProvider)
      setAddress(userAddress)
      setCurrentNetwork(getNetworkName(networkInfo.chainId.toString()))
      setBalance(formatEther(userBalance))
    } catch (err) {
      setError("Failed to connect wallet. Please try again.")
      console.error(err)
    } finally {
      setIsConnecting(false)
    }
  }

  const getNetworkName = (chainId) => {
    const chainIdNum = typeof chainId === "string" ? Number.parseInt(chainId) : chainId
    const network = Object.values(NETWORKS).find((net) => Number.parseInt(net.chainId, 16) === chainIdNum)
    return network ? network.name : "Unknown Network"
  }

  const switchNetwork = async (networkKey) => {
    if (!window.ethereum) return

    const network = NETWORKS[networkKey]
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainId }],
      })

      // Refresh balance after network switch
      setTimeout(async () => {
        if (provider && address) {
          const userBalance = await provider.getBalance(address)
          setBalance(formatEther(userBalance))
          setCurrentNetwork(network.name)
        }
      }, 1000)
    } catch (error) {
      if (error.code === 4902) {
        // Network not added to MetaMask
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: network.chainId,
                chainName: network.name,
                nativeCurrency: {
                  name: network.symbol,
                  symbol: network.symbol,
                  decimals: 18,
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.blockExplorer],
              },
            ],
          })
        } catch (addError) {
          console.error("Failed to add network:", addError)
        }
      }
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setAddress("")
    setCurrentNetwork("")
    setBalance("")
    setError("")
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>🚀 Web3 Profile Manager</h1>
          <p>Connect your wallet and manage your decentralized profile</p>
        </header>

        {error && <div className="error-message">⚠️ {error}</div>}

        {!address ? (
          <div className="connect-section">
            <div className="connect-card">
              <div className="connect-icon">🔗</div>
              <h2>Connect Your Wallet</h2>
              <p>Connect with MetaMask to get started</p>
              <button className="connect-btn" onClick={connectWallet} disabled={isConnecting}>
                {isConnecting ? "🔄 Connecting..." : "🦊 Connect MetaMask"}
              </button>
            </div>
          </div>
        ) : (
          <div className="dashboard">
            <WalletCard address={address} network={currentNetwork} balance={balance} onDisconnect={disconnectWallet} />

            <NetworkSwitcher currentNetwork={currentNetwork} onNetworkSwitch={switchNetwork} networks={NETWORKS} />

            <Profile address={address} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
