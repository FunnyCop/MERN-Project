module.exports = io => {
    const routes = {}

    routes.rotation = ( req, res ) => { io.emit( "NewRotation" ) }

    return routes
}