import server from './server.js'
import mongoose from "mongoose"


mongoose
    .connect(process.env.ATLAS_URL + '/prd', { useNewUrlParser: true })
    .then(() => {
        server.listen(4000, () => {
            console.log("Server listening on port 4000")
        })
    })

export default server