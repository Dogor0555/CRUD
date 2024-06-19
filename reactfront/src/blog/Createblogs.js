import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom'; // Import 'Link' instead of 'link'

const URI = 'http://localhost:8000/blogs/'

const CompCreateBlog = () => {
    const [titulo, setTitulo] = useState('')
    const [contenido, setContenido] = useState('')

    const navigate = useNavigate()


    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, { titulo: titulo, contenido: contenido })
        navigate('/')
    }

    return (

        <div className="container mx-auto my-8 p-4 bg-gradient-to-r from-gray-800 to-black text-white relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-center">Crear Blog</h1>
                <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Regresar

                </Link>
            </div>
            <div className="overflow-x-auto">
                <form onSubmit={store}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="titulo">
                            Título
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            className="w-full px-3 py-2 text-black rounded"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="contenido">
                            Contenido
                        </label>
                        <textarea
                            id="contenido"
                            className="w-full px-3 py-2 text-black rounded"
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                            <FaPlus className="mr-2" /> Crear
                        </button>
                    </div>
                </form>

            </div>
        </div>








    )


}

export default CompCreateBlog;