import { FolderIcon } from "@heroicons/react/24/outline";
import { Coffee, CoffeeOutlined, LockPerson, MonetizationOn, MonetizationOnOutlined, MonetizationOnRounded, MonetizationOnSharp, MonetizationOnTwoTone, Money, MoneyOffCsredOutlined, MoneyOffOutlined, MoneyOffTwoTone, MoneySharp, MoneyTwoTone, PaymentOutlined, PersonPinCircleRounded, PointOfSaleOutlined, RuleFolder, RuleFolderOutlined } from "@mui/icons-material";
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
    segment: 'cadastro/cartao',
    title: 'Cartao',
  },     
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
  {
    segment: 'cadastro/receita',
    title: 'Receita',
  },
  {
    segment: 'cadastro/despesaCartao',
    title: 'Despesa Cartao',
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
  {
    segment: 'cadastro/despesa/extrato',
    title: 'Pagar Despesa',
    icon: <PointOfSaleOutlined  />,
  },
  {
    segment: 'cadastro/despesa/extratoCartao',
    title: 'Pagar Cartao',
    icon: <PointOfSaleOutlined  />,
  },
];
