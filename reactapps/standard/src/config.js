import superConfig from "../../../config"

export default {
  webSocketHost: `${superConfig.domain.subString(1)}:${superConfig.port}/ws`
}
