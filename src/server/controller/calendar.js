const { getCalendar } = require('../model/calendar')

exports.getCalendarController = async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const month = parseInt(req.params.month)
  const year = parseInt(req.params.year)

  if (!boardId || !month || month < 1 || month > 12) {
    res.sendStatus(400)
    return
  }

  const calendar = await getCalendar({ boardId, month, year })

  res.json({ calendar })
}
