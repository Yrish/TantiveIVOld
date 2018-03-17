const app = require("../app")
const pkg = require("../package.json")

const port = process.env.PORT || 3030

app.set('port', port)

app.listen(app.get('port'), () => {console.log(`${pkg.name} running on port ${port}.  Use http://localhost:${port} to view.`)})
