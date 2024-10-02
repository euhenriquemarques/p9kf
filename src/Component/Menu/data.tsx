import { FolderIcon } from "@heroicons/react/24/outline";
import { Coffee, CoffeeOutlined, LockPerson, MonetizationOn, MonetizationOnOutlined, MonetizationOnRounded, MonetizationOnSharp, MonetizationOnTwoTone, Money, MoneyOffTwoTone, MoneySharp, MoneyTwoTone, PersonPinCircleRounded, RuleFolder, RuleFolderOutlined } from "@mui/icons-material";
import { Navigation } from "@toolpad/core";

export const dataSideBar: Navigation = [
  {
    kind: 'header',
    title: 'Menu',
  },
  {
    segment: 'cadastro/adm',
    title: 'ADM',
    icon: <LockPerson />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Cadastro',
  },
  {
    segment: '/cadastro',
    title: 'Cadastros',
    icon: <CoffeeOutlined />,
    children: [
      {
        segment: 'cadastro/conta',
        title: 'Conta',
      },
      {
        segment: 'cadastro/categoria',
        title: 'Categoria',
      },
      {
        segment: 'cadastro/dadosPagamento',
        title: 'Dados Pagamento',
      },
      {
        segment: 'cadastro/despesa',
        title: 'Despesa',
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Gestão',
  },
  {
    segment: 'saldo',
    title: 'Saldo',
    icon: <MonetizationOnOutlined />,
  },
];
