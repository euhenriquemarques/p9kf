import React, { useState } from 'react';

interface FormData {
  codigo: string;
  descricao: string;
}

const Banco: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    codigo: '',
    descricao: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/banco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Sucesso
        alert('Cadastro realizado com sucesso!');
        // Limpar o formulário
        setFormData({
          codigo: '',
          descricao: '',
        });
      } else {
        // Erro
        const errorText = await response.text();
        alert('Erro ao realizar o cadastro: ' + errorText);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao realizar o cadastro.');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="shadow-lg mt-5 rounded-lg p-8 max-w-5xl w-full">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Banco</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-6 mt-7">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <label
                htmlFor="codigo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Código Banco
              </label>
              <input
                id="codigo"
                name="codigo"
                type="text"
                value={formData.codigo}
                onChange={handleChange}
                autoComplete="off"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="w-full md:w-3/4 ">
              <label
                htmlFor="descricao"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descrição
              </label>
              <input
                id="descricao"
                name="descricao"
                type="text"
                value={formData.descricao}
                onChange={handleChange}
                autoComplete="off"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setFormData({ codigo: '', descricao: '' })}
              className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banco;
