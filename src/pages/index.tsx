import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';


const Home: React.FC = () => {
  // Dados dos cards
  const plans = [
    {
      id: 1,
      title: 'Me ajeitando!',
      price: 'R$0',
      description: 'Conhecendo e me ajustando',
      buttonLabel: 'Experimente',
      features: [
        { label: 'Gestão de Contas', included: true },
        { label: 'Categoria Ilimitada', included: false },
        { label: 'Controle de Investimento', included: false },
        { label: 'Planjamento de Planos Futuros', included: false },
        { label: 'Compartilhar Contas', included: false },
        { label: 'Compartilhar Bancos', included: false }

      ],
    },
    {
      id: 2,
      title: 'Tranquilo',
      price: 'R$4,90',
      description: 'Controlando e aprendendo',
      buttonLabel: 'Experimente',
      features: [
        { label: 'Gestão de Contas', included: true },
        { label: 'Categoria Ilimitada', included: true },
        { label: 'Controle de Investimento', included: false },
        { label: 'Planjamento de Planos Futuros', included: false },
        { label: 'Compartilhar Contas', included: false },
        { label: 'Compartilhar Bancos', included: false }
      ],
    },   {
        id: 3,
        title: 'Visionário',
        price: 'R$9,99',
        description: 'Gestor e planejador',
        buttonLabel: 'Experimente',
        features: [
            { label: 'Gestão de Contas', included: true },
        { label: 'Categoria Ilimitada', included: true },
        { label: 'Controle de Investimento', included: true },
        { label: 'Planjamento de Planos Futuros', included: true },
        { label: 'Compartilhar Contas', included: true },
        { label: 'Compartilhar Bancos', included: true }
        ],
      },
  ];



  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}


      {/* Título e Subtítulo */}
      <header className="text-center py-10">
        <h1 className="font-bungee text-8xl font-bold mb-4">NestEgg</h1>
        <p className="text-lg text-gray-600">Seu Caderno Financeiro</p>
      </header>

      {/* Cards */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-6 justify-center">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
          {/* Título e Preço */}
          <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
          <p className="text-4xl font-bold">{plan.price}</p>
          <p className="text-gray-400 mb-5">{plan.description}</p>

          {/* Botão */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 w-full mb-6">
            {plan.buttonLabel}
          </button>

          {/* Lista de Features */}
          <p className="font-semibold mb-2">Inclui:</p>
          <ul className="mb-4">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center mb-2">
                {/* Verificação se o recurso está incluído */}
                <div className="mr-2">
                  {feature.included ? (
                    <span className="text-green-500">✔️</span>
                  ) : (
                    <span className="text-red-500">❌</span>
                  )}
                </div>
                <p className={`text-gray-600 ${!feature.included ? 'line-through text-gray-400' : ''}`}>
                  {feature.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
    </div>
  );
}

export default Home;
