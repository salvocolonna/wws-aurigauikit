import Ajax from "aurigauikit/components/ajax"

//This service is deprecated. Every application must have its own branch-configuration.service'
class BranchConfigurationService {
  constructor(frontend, backend) {
    this.ajaxApp = Ajax(frontend)(backend)
    this._ajaxIS = Ajax(frontend)("wwsis_backend")
  }

  async readBranch(branchId) {
    const params = {
      _metadata: true
    }
    const branchIS = await this._ajaxIS.get(`branch/${branchId}`, params)
    const branchApp = await this.ajaxApp.get(`branch/${branchId}`, params)

    return {
      _metadata: branchIS._metadata,
      content: {
        ...branchIS.content,
        mainCurrency: branchApp.content.mainCurrency,
        minChannelThreshold: branchApp.content.minChannelThreshold,
        maxChannelThreshold: branchApp.content.maxChannelThreshold,
        minThreshold: branchApp.content.minThreshold,
        insuranceLimit: branchApp.content.insuranceLimit,
        maxThreshold: branchApp.content.maxThreshold,
        citId: branchApp.content.citId,
        citCode: branchApp.content.citCode,
        citActivation: branchApp.content.citActivation,
        citExpiration: branchApp.content.citExpiration,
        daysToService: branchApp.content.daysToService,
        cashpoints: branchApp.content.cashpoints
      }
    }
  }

  async editBranch(branchId, branchBean) {
    return await this._ajaxIS.put(`branch/${branchId}`, branchBean)
  }
}

const instances = {}

const getInstance = frontend => backend => {
  const key = frontend + "_" + backend
  if (!instances[key]) instances[key] = new BranchConfigurationService(frontend, backend)
  return instances[key]
}

export default getInstance
