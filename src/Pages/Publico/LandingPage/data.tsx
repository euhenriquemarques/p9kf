
import { Planos } from "../../../Interface/interface";

  
export const dataPlanos: Planos[] = [
    {
      id: 1,
      title: "Me ajeitando!",
      price: "R$0",
      description: "Conhecendo e me ajustando",
      buttonLabel: "Experimente",
      features: [
        { label: "Gestão de Contas", included: true },
        { label: "Categoria Ilimitada", included: false },
        { label: "Controle de Investimento", included: false },
        { label: "Planjamento de Planos Futuros", included: false },
        { label: "Compartilhar Contas", included: false },
        { label: "Compartilhar Bancos", included: false },
      ],
    },
    {
      id: 2,
      title: "Tranquilo",
      price: "R$4,90",
      description: "Controlando e aprendendo",
      buttonLabel: "Experimente",
      highlight: true, // Destaque para o plano mais procurado
      features: [
        { label: "Gestão de Contas", included: true },
        { label: "Categoria Ilimitada", included: true },
        { label: "Controle de Investimento", included: false },
        { label: "Planjamento de Planos Futuros", included: false },
        { label: "Compartilhar Contas", included: false },
        { label: "Compartilhar Bancos", included: false },
      ],
    },
    {
      id: 3,
      title: "Visionário",
      price: "R$9,99",
      description: "Gestor e planejador",
      buttonLabel: "Experimente",
      features: [
        { label: "Gestão de Contas", included: true },
        { label: "Categoria Ilimitada", included: true },
        { label: "Controle de Investimento", included: true },
        { label: "Planjamento de Planos Futuros", included: true },
        { label: "Compartilhar Contas", included: true },
        { label: "Compartilhar Bancos", included: true },
      ],
    },
  ];