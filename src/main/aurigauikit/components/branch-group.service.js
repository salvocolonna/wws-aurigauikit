import Ajax, { REQUEST } from "aurigauikit/components/ajax"

class BranchGroupService {
  constructor(frontend) {
    this._ajax = Ajax(frontend)("wwsis_backend")
  }

  async findByFilter(branchGroupCode, notPublic) {
    const params = {
      _metadata: true
    }
    if (branchGroupCode) params.branchGroupCode = branchGroupCode
    if (notPublic && notPublic.id !== "ALL") {
      params.notPublic = notPublic.id === "YES"
    }
    return await this._ajax.get("branchGroup/findByFilter", params)
  }

  async saveBranchGroup(branchGroupBeanRequest) {
    return await this._ajax.post("branchGroup", branchGroupBeanRequest)
  }

  async readBranchGroup(branchGroupId) {
    return await this._ajax.get(`branchGroup/${branchGroupId}`)
  }

  async editBranchGroup(branchGroupId, branchGroupBeanRequest) {
    return await this._ajax.put(`branchGroup/${branchGroupId}`, branchGroupBeanRequest)
  }

  async deleteBranchGroup(branchGroupId) {
    return await this._ajax.delete(REQUEST.RAW)(`branchGroup/${branchGroupId}`)
  }

  async readBranch(branchId) {
    const params = {
      _metadata: true
    }
    return await this._ajax.get(`branch/${branchId}`, params)
  }
}

export default BranchGroupService
