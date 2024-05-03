const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.query;

        if (rating < 0 || rating > 5) {
            throw new AppError("O nota deve ser entre 0 e 5.")
        } 

        const checkIfTitleExist = await knex("notes").where({ title })        

        if(checkIfTitleExist.length > 0) {
            throw new AppError("Esse título já foi cadastrado.")
        }

        const [note_id] = await knex("notes").insert({
            title,
            description,
            rating,
            user_id,
        });

        const TagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(TagsInsert);

        response.json();
    }

    async show(request, response) {
       const { id } = request.query;

       const note = await knex("notes").where({ id }).first();
       const tags = await knex("tags").where({ note_id: id }).orderBy("name")
       
       return response.json({
        ...note,
        tags
       })        
    };

    async delete(request, response) {
        const { id } = request.query;
        
        if(!id) {
            throw new AppError("Nota não encontrada.")
        }

        await knex("notes").where({ id }).delete();

        return response.json();

    }

    async index(request, response) {
        const { user_id, title, tags } = request.query;

        const checkUserExists = await knex("notes")
            .join("users", "notes.user_id", "=", "users.id")
            .where("notes.user_id", user_id)
            .select("users.name");

        if(checkUserExists.length === 0) {
            throw new AppError("Usuário não encontrado.")
        }

        let notes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await knex("tags")
                .distinct("notes.id")
                .select([
                    "notes.id",
                    "notes.title",                   
                    "notes.rating",                    
                    "users.name as user"
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("tags.name", filterTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .innerJoin("users", "users.id", "notes.user_id")
                .orderBy("notes.title")      
        }
        else {
            notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
        }
        const userTags = await knex("tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: noteTags
            }
        })

        return response.json({ notesWithTags });     
    };
};

module.exports = MoviesController;