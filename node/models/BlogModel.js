import db from '../database/db.js';

import { DataTypes} from "sequelize";

const BlogModel = db.define("blogs", {
    titulo: {type: DataTypes.STRING},
    contenido: {type: DataTypes.STRING},

})

export default BlogModel