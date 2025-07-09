"use client"

function NetworkSwitcher({ currentNetwork, onNetworkSwitch, networks }) {
  const getNetworkEmoji = (networkName) => {
    switch (networkName.toLowerCase()) {
      case "ethereum":
        return "⟠"
      case "bsc":
        return "🟡"
      case "polygon":
        return "🟣"
      default:
        return "🌐"
    }
  }

  return (
    <div className="network-switcher">
      <h3>🔄 Switch Network</h3>
      <div className="network-buttons">
        {Object.entries(networks).map(([key, network]) => (
          <button
            key={key}
            className={`network-btn ${currentNetwork === network.name ? "active" : ""}`}
            onClick={() => onNetworkSwitch(key)}
          >
            <span className="network-emoji">{getNetworkEmoji(network.name)}</span>
            <span className="network-name">{network.name}</span>
            <span className="network-symbol">{network.symbol}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default NetworkSwitcher
