import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("inputNumber") inputText: ElementRef;
  @ViewChild("selected") selectAs: ElementRef;
  options = [
    {value:"", display:""},
    {value:"prime", display: "isPrime"},
    {value:"fibinucci", display: "isFibonacci"}
  ]
  primeMemory = [2,3,5,7,11];
  fiboMemory = [0,1,1,2,3,5];
  result = true;
  foundResult = false;
  
  onTextChange(input: string){
    if (input){
      var inputNumber = Number(input);
      if (input.indexOf(".") > -1){
        this.inputText.nativeElement.value = Math.round(inputNumber)
      }
      if (inputNumber < 0){
        this.inputText.nativeElement.value = 1;
        inputNumber = 1;
      }
      if (this.selectAs.nativeElement.value){
        this.onCalculate(inputNumber, this.selectAs.nativeElement.value)
      }
    }
  }

  onSelectOption(option: string){
    if (option && this.inputText.nativeElement.value ){
      this.onCalculate(Number(this.inputText.nativeElement.value), option)
    }
  }

  onCalculate(num: number, opt: string){
    this.result = true;
    this.foundResult = false;
    if (opt == this.options[1].value){
      this.isPrime(num)
    }else{
      this.isFibonacci(num);
    }


  }

  isPrime(num: number): void{
    const divide = Math.floor(num / 2);
    let maxNumber = this.primeMemory[this.primeMemory.length-1]; 
    if (num == 0 || num == 1 || num % 2 == 0){
      this.result = false;
      this.foundResult = true;
    } else {
        if (this.primeMemory.includes(num)){
          this.foundResult = true;
        }
        if (!this.foundResult){
          for(let i=0; i < this.primeMemory.length; i++){
            const prime = this.primeMemory[i]
            if (prime < divide){
              if (num % prime == 0){
                this.result = false;
                this.foundResult = true;
                break;
              }
            }else{
              maxNumber = this.primeMemory[i-1];
              break;
            }
          }
        }
        if (!this.foundResult){
          while(true){
            maxNumber = maxNumber + 1;
            if (maxNumber <= divide){
              if (num % maxNumber == 0){
                this.result = false;
                this.foundResult = true;
                break;
              }
            }else{
              this.foundResult = true;
              this.primeMemory.push(num);
              this.primeMemory.sort((n1,n2) => n1 - n2);
              break;
            }
          }
        }
      }
    }

    isFibonacci(num: number){
      let last = this.fiboMemory[this.fiboMemory.length-1]
      let beforeLast = this.fiboMemory[this.fiboMemory.length-2]
      if (this.fiboMemory.includes(num)){
        this.foundResult = true;
      }
      if (!this.foundResult){
        while(true){
          last = last + beforeLast;
          beforeLast = last - beforeLast;
          this.fiboMemory.push(last);
          if (last < num || beforeLast < num){
            if (num == last){
              this.foundResult = true;
              break;
            }else if (num == beforeLast) {
              this.foundResult = true
              break;
            }
          }else{
            this.result = false;
            this.foundResult = true;
            break;
          }
        }
      }
    }
}