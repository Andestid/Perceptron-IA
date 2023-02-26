//Neurona de 2 entradas puerta AND
function exercise(){
    let input = [
      //entradas de la neurona 
      [document.getElementById("a").value, document.getElementById("a2").value], //1
      [document.getElementById("b").value, document.getElementById("b2").value], //2
      [document.getElementById("c").value, document.getElementById("c2").value], //3
      [document.getElementById("d").value, document.getElementById("d2").value] //4
  ]
  //Lo que quiero que aprenda la neurona
  let output = [
    document.getElementById("s1").value,  //con la entrada 0,0 quiero que salga 0
    document.getElementById("s2").value, //con la entrada 0,1 quiero que salga 0
    document.getElementById("s3").value, //con la entrada 1,0 quiero que salga 0
    document.getElementById("s4").value //con la entrada 1,1 quiero que salga 1
  ]
      neurona.train(3000,input,output)
      var ctx = document.getElementById('myChart').getContext('2d');  
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['W1', 'W2', 'W3'],
              datasets: [{
                label: 'Pesos',
                data: getPesos(),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              },
            {
              label: 'input',
                  data:getinput(),
                  backgroundColor: [
                      'rgba(192, 192, 192,0.2)',
                      'rgba(192, 192, 192,0.2)',
                      'rgba(192, 192, 192,0.2)',
                      'rgba(192, 192, 192,0.2)',
                      'rgba(192, 192, 192,0.2)',
                      'rgba(192, 192, 192,0.2)'
                  ],
                  borderColor: [
                      'rgba(192, 192, 192)',
                      'rgba(192, 192, 192)',
                      'rgba(192, 192, 192)',
                      'rgba(192, 192, 192)',
                      'rgba(192, 192, 192)',
                      'rgba(192, 192, 192)'
                  ],
                  borderWidth: 1
            },
            {
              label: 'output',
                  data: getoutput(),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                    'rgba(0, 0, 0, 0)',
                  ],
                  borderWidth: 1
            }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
  }

  let neurona = {
     pesos: [],
      sesgo: null,
      lr:0.001,
      init: function (numPesos) { //Le digo el numero de pesos que quiero que tenga y random darlos
          for (let i = 0; i < numPesos; i++) {
             this.pesos[i] = Math.random() * (0.5 + 0,5) - 0.5; 
          //Pesos pequeños cercanos a 0 pudiendo ser positivos o negativos, es mas eficiente
      }
          this.sesgo = Math.random() * (0.5 + 0,5) - 0.5; //Lo mismo que el peso pero un solo valor
      },
      salida(input) {
      let salida = 0;
      for (let index = 0; index < input.length; index++) {
          salida += this.pesos[index] * input[index];  //primera parte suma ponderada entrada * pesos + ent * pes
         }
         salida += this.sesgo; //ultima parte sumada el sesgo
         
         //funcion activacion del escalon para mejorar rendimiento 
         if(salida < 1){
          salida = 0;
         }else{
          salida = 1;
         }
         return salida;
      },
      train(epochs,dataInput,dataOutput) {
          console.log("w1",document.getElementById("a").value)
          console.log("testw1: ",document.getElementById("s1").value)
          //Si ha visto y ajustado el peso para cada uno de los datos entonces habra hecho una epoca (epochs)
          for (let i = 0; i < epochs; i++) {
              let errorepochs = 0; //Contador de errores por cada epoca 
              for (let j = 0; j < dataInput.length; j++) {
                  let actualinput = dataInput[j];
                  let actualoutput = dataOutput[j];
                  let salida = this.salida(actualinput);
                  let error = actualoutput - salida; //ajusto el error positivo o negativo 
                  errorepochs += Math.abs(error); //paso peso a absoluto solo en la epoca 
                  this.ajustepesos(error, actualinput)
              }
              console.log(errorepochs / dataInput.length); //error medio que se ha producido por epoca
          }
          console.log("testw1: ",document.getElementById("s1").value)
          for (let i = 0; i < dataInput.length; i++) {
              console.log("entrada: " + dataInput[i]);
              console.log("salida: " + neurona.salida(dataInput[i]));
              console.log("salida esperada: " + dataOutput[i]);
          }
      },
      ajustepesos(error, actualinput) {
          for (let i = 0; i < this.pesos.length; i++) {
              let ajuste = error * this.lr * actualinput[i]; //ajustamos pesos
              this.pesos[i] += ajuste;
          }
          let ajuste = error * this.lr * 1; //ajustamos sesgo entrada de sesgo es siempre 1
          this.sesgo += ajuste;
      }
  }
  neurona.init(3); //2 pesos porque hay 2 entradas
  function adivinar(){
  document.getElementById("st1").value = neurona.salida([0,0,0]);
  }
  function getPesos() {
    return neurona.pesos;
  }
  function getinput() {
return neurona.input;
  }
  function getoutput() {
    return neurona.output;
      }
  
