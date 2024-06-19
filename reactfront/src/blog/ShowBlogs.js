import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const URI = 'http://localhost:8000/blogs/';

const CompShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await axios.get(URI);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (id) => {
    setBlogToEdit(id);
    setShowEditModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${URI}${blogToDelete}`);
      getBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const handleConfirmEdit = () => {
    navigate(`/edit/${blogToEdit}`);
    setShowEditModal(false);
    setBlogToEdit(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setBlogToEdit(null);
  };

  const exportTableToPDF = () => {
    const doc = new jsPDF();
    const tableElement = document.querySelector('table');

    // Clonar el elemento <table> y filtrar las columnas no deseadas
    const clonedTable = tableElement.cloneNode(true);
    const headerRow = clonedTable.querySelector('thead tr');
    const dataRows = Array.from(clonedTable.querySelectorAll('tbody tr'));

    // Eliminar la columna "Acciones"
    headerRow.lastChild.remove();
    dataRows.forEach((row) => row.lastChild.remove());

    doc.autoTable({ html: clonedTable });
    doc.save('blogs.pdf');
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-gradient-to-r from-gray-800 to-black text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Lista de Blogs</h1>
        <Link
          to="/create"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Crear
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contenido</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-6 py-4 whitespace-nowrap">{blog.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{blog.contenido}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={() => handleEditClick(blog.id)}
                  >
                    <FaEdit className="mr-2" /> Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(blog.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <FaTrash className="mr-2" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={exportTableToPDF}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mx-auto mt-4"
      >
        <FaFilePdf className="mr-2" /> Exportar a PDF
      </button>

      {showDeleteModal && (
        <Modal
          message="¿Está seguro de querer eliminar este blog?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showEditModal && (
        <Modal
          message="¿Está seguro de querer editar este blog?"
          onConfirm={handleConfirmEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default CompShowBlogs;