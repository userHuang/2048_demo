import Server from '@/extend/Server'
import Config from '@/extend/config'

class ContractServices {
  request (params) {
    const baseParams = {
      url: Config.coocaaHost + params.url
    }
    Object.assign(params, baseParams)
    return Server(params)
  }
}

const Services = new ContractServices()
// {get: params, post: data}
export default {
  getDetail (data) {
    return Services.request({
      url: '/voicebot/livechannel/commonSetting',
      params: data,
      method: 'get'
    })
  }
}