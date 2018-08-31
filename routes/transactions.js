var express     = require("express"),
    router      = express.Router(),
    Transaction = require("../models/transaction"),
    Asset       = require("../models/asset")

//:Get
router.get("/", function(req, res){
    
    Transaction.find({}, function(err, assets){
        if(err){
            console.log(err);
        } else {
            res.render("assets/index", {transactions:transactions});
        }
    })
})

//:Post
router.post("/", function(req, res){
    var newTransaction = {buyerKey: req.body.buyerKey, sellerKey: req.body.sellerKey, token: req.body.token, amount:req.body.amount};
    Transaction.create(newTransaction, function(err, newlyTransaction){
        if(err){
            console.log(err);
        } else {
            res.redirect("assets/index");
        }
    })
});

//:New
router.get("/new", function(req, res){
    res.render("transactions/new");
})

//:Show
router.get("/:id", function(req, res){
    Asset.findById(req.params.id).populate("transactions","wallet").exec(function(err, asset){
        if(err){
            console.log(err);
        } else {
            res.render("assets/show", {asset: asset})
        }
    })
})


router.get("/new/:id", function(req, res){
    Asset.findById(req.params.id, function(err, asset){
        if(err){
            console.log(err);
        } else {
            res.render("transactions/new", {asset: asset})
        }
    })
})
module.exports = router;