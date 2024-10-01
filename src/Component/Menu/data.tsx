import { Navigation } from "@toolpad/core";

export const dataSideBar: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '/path/cadastro/adm',
    title: 'Dashboard',
  },
  {
    segment: '/cadastro/usuario',
    title: 'Usuario',
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: '/cadastro/',
    title: 'Categoria',
    children: [
      {
        segment: '/cadastro/categoria/dadosPagamento',
        title: 'Dados Pagamento',
      },
      {
        segment: '/cadastro/categoria/despesa',
        title: 'Despesa',
      },
    ],
  },
  {
    segment: '/cadastro/categoria/extrato',
    title: 'Extrato',
  },
];
