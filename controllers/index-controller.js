const createPath = require("../helpers/createPath")

const getIndex = (req, res) => {
    const title = 'Главная страница'

    res.render(createPath('index'), { title })
}

module.exports = {
    getIndex
}
