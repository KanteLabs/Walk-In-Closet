const Clothes = require('../models/clothes')
const Outfits = require('../models/outfits')

const outfitController = {};

outfitController.index = (req, res)=>{
    Outfits.findAll(req.user.id)
    .then((outfits)=>{
        res.render('clothes/outfits/outfits_all',{
            username: req.user.username,
            data: outfits
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
}

outfitController.newFit = (req, res)=>{
    Clothes.findByClothing_type('Tees','pants','Sneakers')
    .then((clothes)=>{
        res.render('clothes/outfits/outfits_add',{
            data: clothes
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
}

outfitController.show = (req, res)=>{
    Outfits.findById(req.params.id)
    .then((clothes)=>{
        res.json({
            message: 'ok',
            data: clothes
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
}

outfitController.create = (req, res)=>{
    Outfits.create({
        name: req.body.name,
        top_id: req.body.top_id,
        bottom_id: req.body.bottom_id,
        shoe_id: req.body.shoe_id,
        clout_points: req.body.clout_points
    },req.user.id).then(()=>{
        res.redirect('/clothes/outfits')
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
}

// clothingController.update = (req, res)=>{
//     Clothes.update({
//         name: req.body.name,
//         brand: req.body.brand,
//         description: req.body.description,
//         price: req.body.price,
//         productId: req.body.productId,
//         brandedName: req.body.brandedName,
//         imageBest: req.body.imageBest,
//         clothing_type: req.body.clothing_type
//     }, req.params.id).then((clothes)=>{
//         res.redirect(`/clothes/${req.params.id}`)
//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json(err)
//     })
// }

// clothingController.edit = (req, res)=>{
//     Clothes.findById(req.params.id)
//     .then((clothes)=>{
//         res.render('clothes/clothing_edit',{
//             data: clothes
//         })
//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json(err)
//     })
// }

// clothingController.delete = (req, res) => {
//     Clothes.destroy(req.params.id)
//     .then(()=>{
//         res.redirect('/clothes')
//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json(err)
//     })
// }

module.exports = outfitController;