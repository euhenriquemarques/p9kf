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
    icon: <img src="/card.png" alt="Ícone Cartão" style={{ width: '24px', height: '24px' }} />,

  },     
  {
    segment: 'cadastro/conta',
    title: 'Conta',
    
    icon: <img src="/personal-data.png" style={{ width: '24px', height: '24px' }} />,
  },
  {
    segment: 'cadastro/categoria',
    title: 'Categoria',
    icon: <img src="/categorization.png" style={{ width: '24px', height: '24px' }} />,
  },
  {
    segment: 'cadastro/dadosPagamento',
    title: 'Dados Pagamento',
    icon: <img src="/pagar conta.png" style={{ width: '24px', height: '24px' }} />,
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
    title: 'Atualizar Saldo',
    icon: <img src="/saldo.png" style={{ width: '24px', height: '24px' }} />,
  },
  {
    segment: 'cadastro/despesa',
    title: 'Lançar Despesa',
    icon: <img src="/despesas.png" style={{ width: '24px', height: '24px' }} />,
  },  
  {
    segment: 'cadastro/receita',
    title: 'Lançar Receita',
    icon: <img src="/receita.png" style={{ width: '24px', height: '24px' }} />,
  },
  {
    segment: 'cadastro/despesaCartao',
    title: 'Lançar Despesa Cartao',
    icon: <img src="/payment.png" style={{ width: '24px', height: '24px' }} />,
  },
  {
    segment: 'cadastro/despesa/extrato',
    title: 'Pagar Despesa',
    icon: <img src="/pagar conta.png" style={{ width: '24px', height: '24px' }} />,
  },
  {
    segment: 'cadastro/despesa/extratoCartao',
    title: 'Pagar Cartao',
    icon: <img src="/pagar cartao.png" style={{ width: '24px', height: '24px' }} />,
  },  
  {
    segment: 'cadastro/receita/extratoReceita',
    title: 'Receber Receita',
    icon: <img src="/revenue.png" style={{ width: '24px', height: '24px' }} />,
  },
];
