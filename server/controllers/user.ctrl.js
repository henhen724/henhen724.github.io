/** server/controllers/user.ctrl.js*/
const User = require('./../models/User')


module.exports = {
    addUser: (req, res, next) => {
        let { name, email, password } = req.body
        /*if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' }
                saveUser(obj)
            },{
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
        }else {
            saveArticle({ text, title, claps, description, feature_img: '' })
        }*/
        var newUser = new User({ name, email, password })
        newUser.save()
        // function saveUser(obj) {
        //     new User(obj).save((err, user) => {
        //         if (err)
        //             res.send(err)
        //         else if (!user)
        //             res.send(400)
        //         else {
        //             return article.addAuthor(req.body.author_id).then((_article) => {
        //                 return res.send(_article)
        //             })
        //         }
        //         next()
        //     })
        // }
    },
    /**
     * friend_id, sender_id
     */
    requestFriend: (req, res, next) => {
        User.findById(req.body.friend_id).then((friend)=> {
            return friend.requestFriend({
                sender: req.body.sender_id
            }).then(() => {
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },
    /**
     * user_id
     */
    getProfile: (req, res, next) => {
        User.findById(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, article)=> {
            if (err)
                res.send(err)
            else if (!article)
                res.send(404)
            else
                res.send(article)
            next()            
        })
    }
    
}