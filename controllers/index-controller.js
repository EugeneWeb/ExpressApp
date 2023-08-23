const createPath = require("../helpers/createPath")

const getIndex = (req, res) => {
    const title = 'Главная страница'

    res.render(createPath('error'), { title })
}

module.exports = {
    getIndex
}