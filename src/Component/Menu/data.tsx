import { NavigateFunction } from "react-router-dom";

interface MenuItem {
  text: string;
  action: () => void;
  categoria: boolean;
}

export const dataMenu = (navigate: NavigateFunction): MenuItem[] => [
  {
    text: "Cadastro",
    action: () => {},
    categoria: true,
  },
  {
    text: "ADM",
    action: () => {
      navigate("/cadastro/adm");
    },
    categoria: false,
  },
  {
    text: "Categoria",
    action: () => {
      navigate("/cadastro/categoria");
    },
    categoria: false,
  },
  {
    text: "Conta",
    action: () => {
      navigate("/cadastro/conta");
    },
    categoria: false,
  },
  {
    text: "Dados Pagamento",
    action: () => {
      navigate("/cadastro/dadosPagamento");
    },
    categoria: false,
  },
  {
    text: "Mes",
    action: () => {},
    categoria: true,
  },
  {
    text: "Lançamento Despesas",
    action: () => {
      navigate("/cadastro/categoria");
    },
    categoria: false,
  },
];
