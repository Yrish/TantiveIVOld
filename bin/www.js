const app = require("../app")
const pkg = require("../package.json")
const config = require("../config")

const port = process.env.PORT || 3030

app.set('port', port)

app.listen(app.get('port'), () => {console.log(`${pkg.name} running on port ${port}.  Use http://${config.domain.substring(1)}:${port} to view.`)})
