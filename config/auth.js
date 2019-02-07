module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.emailVerified){
        return next()
      }
      req.flash('error_msg', 'Please verify your email before using this account.')
    }
    req.flash('error_msg', 'Please log in to view this page.')
    res.redirect('/users/login')
  }
}
