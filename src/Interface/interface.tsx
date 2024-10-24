import { Dayjs } from "dayjs";

export  interface iBanco {
  id: number;
    codigo: string;
    descricao: string;
  }

  export interface iCategoria {
    id: number;
    descricao: string;
    movimentacao: string;
    usuario: iUsuario;
  }
  
  export interface iCartao {
    id: number;
    descricao: string;
    dataVencimentoCartao: string;
    dataFechamento: string;
    usuario: iUsuario;
  }
  
  export interface iUsuario {
    id: number;
    descricao: string;
  }
  

  export interface Feature {
    label: string;
    included: boolean;
  }
  

  export interface Planos {
    id: number;
    title: string;
    price: string;
    description: string;
    buttonLabel: string;
    features: Feature[];
    highlight?: boolean; 
  }

  export interface iConta {
    id: number;
    numero: string;
    agencia: string;
    banco: iBanco;
    compartilhado: boolean;
    status: boolean;
    nacional: boolean;
    usuario: iUsuario;
  }

  export interface iDadosPagamento {
    id: number;
    despesa:iDespesas,
    descricao: string;
    dadosPagamento: string;
  }

  export interface iDespesas {
    id: number;
    categoria: iCategoria;
    usuario: iUsuario;
    dataProcessamento: string;
    recorrente: boolean;
    parcela: number;
    parcelaTotais: number;
    dataVencimentoParcela: string;
    juros: boolean;
    ativo: boolean;
    valorParcela: number;
    valorTotal: number;
    descricao: string;
  }

  export interface iReceitas {
    id: number;
    categoria: iCategoria;
    usuario: iUsuario;
    dataProcessamento: string;
    recorrente: boolean;
    parcela: number;
    parcelaTotais: number;
    dataVencimentoParcela: string;
    ativo: boolean;
    valorParcela: number;
    valorTotal: number;
    descricao: string;
  }
  
  
  export interface iDespesaCartao {
    id: number;
    cartao: iCartao;
    usuario: iUsuario;
    dataProcessamento: string;
    recorrente: boolean;
    parcela: number;
    parcelaTotais: number;
    dataCompra: string;
    ativo: boolean;
    valorParcela: number;
    valorTotal: number;
    descricao: string;
  }
  

  
  export interface iExtratoDespesa {
    id: number;
    valor:number,
    valorJuros:number,
    valorDesconto:number,
    despesa:iDespesas,
    usuario: iUsuario;
    dataProcessamento: string;
    dataPagamento: Dayjs | string;
  }
  
  export interface iExtratoDespesaCartao {
    id: number;
    valor:number,
    valorJuros:number,
    valorDesconto:number,
    cartao :iCartao,
    usuario: iUsuario;
    dataProcessamento: string;
    dataPagamento: Dayjs | string;
  }

  export interface iSaldo {
    id: number;
    saldo:number,
    conta:iConta,
  
  }

  export interface iHomeDto {
    listaSaldo: iSaldoDto[],
    listaDespesa: iDespesasDto[],
    listaExtratoDespesa: iExtratoDespesasDto[],
    listaExtratoDespesaCartao: iExtratoDespesaCartaoDto[],
    listaDespesaCartao: iDespesasCartaoDto[],
    listaDespesaCartao12Meses: iDespesasCartaoDto[],
    valortotalParcelado: number,
    valortotalRecorrente: number,
  }

  export interface iSaldoDto {
    saldo:number,
    banco:string,
    numero:string,
  
  }
  export interface iExtratoDespesaCartaoDto {
    dataPagamento: Dayjs | string;
    cartao:string,
    valor:number,
    valorJuros: number;
    valorDesconto: number;
  }
  
  export interface iDespesasDto {
    parcela: number;
    parcelaTotais: number;
    dataVencimentoParcela: string;
    valorParcela: number;
    descricao: string;

  }    
  export interface iDespesasCartaoDto {
    valor: number;
    cartao: string;
    meses:  [];
    ano: string;

  }  
  export interface iExtratoDespesasDto {
    parcela: number;
    valor: number;
    valorJuros: number;
    dataPagamento: string;
    dataVencimento: string;
    valorDesconto: number;
    despesa: string;

  }  

  