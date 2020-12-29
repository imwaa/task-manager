const indexCtrl = {}

indexCtrl.renderIndex = (req,res)=>{
    res.render("index")
}
indexCtrl.renderAbout = (req,res)=>{
    res.render("About")
}

module.exports = indexCtrl