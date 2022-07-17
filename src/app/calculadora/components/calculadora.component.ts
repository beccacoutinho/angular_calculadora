import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { CalculadoraService } from '../services/calculadora.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();
  }

  limpar(): void {
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adiciona o número selecionado para o cálculo posteriormente.
   * 
   * @param string numero
   * @return void
   */

  adicionarNumero(numero: string): void{
    if (this.operacao === null){
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else{
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  /**
   * Retornar o valor concatenado. Trata o separador decimal.
   * 
   * @param string numAtual
   * @param string numConcat
   * @return string
   */

  //caso contenha apenas '0' ou null, reinicia o valor
  concatenarNumero(numAtual: string, numConcat: string): string{
    if (numAtual === '0' || numAtual === null){
      numAtual ='';
    }

    //primeiro difito é '.', concatena '0' antes do ponto
    if(numConcat === '.' && numAtual ===''){
      return '0.';
    }

    //caso '.' digitado e já contenha um '.', apenas retorna
    if(numConcat === '.' && numAtual.indexOf('.') > -1){
      return numAtual;
    }

    return numAtual + numConcat;
  }

  /**
   * Executa lógica quando um operador for selecionado. Caso já
   * possuam uma operação slecionada, executa a operação anterior, e define
   * nova operação.
   * 
   * @param string operacao
   * @return void
   */

  definirOperacao(operacao: string): void{
    // apenas define a operação caso não exista uma
    if(this.operacao === null){
      this.operacao = operacao;
      return;
    }

    /*caso operação definida e número 2 selecionado, efetua
    o calculo da operação */

    if (this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
        this.operacao = operacao;
        this.numero1 = this.resultado.toString();
        this.numero2 = null;
        this.resultado = null;
    }
  }

  /** 
   * efetua o cálculo de uma operação
   * 
   * @return void
   */

  calcular(): void{
    if(this.numero2 === null){
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   * 
   * @return string
   */

  get display(): string{
    if (this.resultado !== null){
      return this.resultado.toString();
    }
    if (this.numero2 !== null){
      return this.numero2;
    }

    return this.numero1;
  }

}
