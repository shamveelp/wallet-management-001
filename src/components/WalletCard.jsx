"use client"

function WalletCard({ address, network, balance, onDisconnect }) {
  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    alert("Address copied to clipboard!")
  }

  return (
    <div className="wallet-card">
      <div className="wallet-header">
        <h3>💼 Wallet Info</h3>
        <button className="disconnect-btn" onClick={onDisconnect}>
          🔌 Disconnect
        </button>
      </div>
      <div className="wallet-content">
        <div className="wallet-item">
          <span className="label">Address:</span>
          <span className="value address" onClick={copyToClipboard}>
            {formatAddress(address)} 📋
          </span>
        </div>
        <div className="wallet-item">
          <span className="label">Network:</span>
          <span className="value network">{network}</span>
        </div>
        <div className="wallet-item">
          <span className="label">Balance:</span>
          <span className="value balance">{Number.parseFloat(balance).toFixed(4)}</span>
        </div>
      </div>
    </div>
  )
}

export default WalletCard
