exports.getUserController = async (req, res) => {
  res.json({ user: req.user })
}
