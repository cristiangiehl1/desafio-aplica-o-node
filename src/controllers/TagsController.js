const knex = require("../database/knex")

class TagsController {
    async index(request, response) {
        const { user_id } = request.query;

        const tags = await knex("tags")
            .distinct("name")
            .where({ user_id })

            return response.json(tags)
    }

    

}

module.exports = TagsController;