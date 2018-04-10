import ContractService from "./contract-service"
import IpfsService from "./ipfs-service"
import UserRegistryService from "./user-registry-service"

// Resources contain mutiple definition of Smart Contract workflows
// TODO Should load anything inside resources programatically
const resources = {
  listings: require("./resources/listings")
}

class O2O {
  constructor(options) {
    // Fail soon when no web3 supply
    const { web3 } = options || {}
    if (!web3) throw new Error("Please provide 'web3' in options")

    // Should load web3 explicitly
    // Load from window.web3 is not good option
    this.contractService = new ContractService({ web3 })
    this.ipfsService = new IpfsService({ web3 })

    // TODO: This service is deprecated
    this.userRegistryService = new UserRegistryService()

    // Instantiate each resource and give it access to contracts and IPFS
    for (let resourceName in resources) {
      let Resource = resources[resourceName]
      this[resourceName] = new Resource({
        contractService: this.contractService,
        ipfsService: this.ipfsService
      })
    }
  }
}

module.exports = O2O