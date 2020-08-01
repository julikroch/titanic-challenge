/* ENUNCIADO
  PARTE 1:
  Se desea obtener las personas que estuvieron en el titanic que sean: mujeres y menores a 76 años. Agruparlas de la siguiente manera: 0-15, 16-30, 31-45, 46-60, 61-75.

  PARTE 2:
  Se debería poder agrupar de 5 en 5, de 10 en 10. Es decir, de forma variable. A su vez, imprimir la cantidad de personas dentro de cada grupo y mostrar los rangos en el grafico.

*/

import ProgressBar from './ProgressBar';
import titanic from './titanic.json';

const bar = ProgressBar();
const total = titanic.length;


//PARTE 1

// Filtro el array para que unicamente me devuelva las mujeres cuya edad este completa.
const femaleArray = titanic.filter(record => record.fields.sex === 'female' &&record.fields.age != null);
const female = femaleArray.length;

//Funcion que recibe la edad minima, maxima, y un array. Devuelve la cantidad de mujeres que hay entre dichos rangos de edad.
const countFemale = (minimumAge, maximumAge, array) => {
  return array.filter(record => record.fields.age >= minimumAge && record.fields.age <= maximumAge).length;
}

// Rangos de edades
const ranks = [
  [0,15],
  [16,30],
  [31,45],
  [46,60],
  [61,75]
]

//Funcion que recibe un array, un contenedor para imprimir las edades segun rango, y un grafico para exhibir las cantidades segun los rangos
const printRank = (array, container) => {
  ranks.forEach((rank) => {
    const minimumAge = rank[0];
    const maximumAge = rank[1];
    const quantity = countFemale(minimumAge, maximumAge, array);

    const printResult = document.getElementById(container);
    printResult.innerHTML += '<p><strong>Cantidad de mujeres '+ minimumAge + ' a '+ maximumAge + ' años: ' + quantity + '</strong></p>';

    const graphics = document.getElementById(container);
    graphics.innerHTML += bar(quantity / array.length, ' (Mujeres de ' + minimumAge + ' a ' + maximumAge + ').<br></br>');
  })
}

printRank(femaleArray, 'female-data');

/*---------------------------------------------------------------------------------------------------PARTE 2----------------------------------------------*/

//Limpio el div para cuando se cambia el valor del dropdown, y a su vez le paso el valor del dropdown a la funcion para agrupar.
document.getElementById('groupBy').addEventListener('change', function(){
  document.getElementById('group-data').innerHTML = '';
  const selectedValue = Number(document.getElementById('groupBy').value);
  groupBy(selectedValue);
})

const groupBy = (quantity) => {
  const arrayByQuantity = [];
  
  //Recorro el array original y lo voy subdidiviendo en uno nuevo, segun la cantidad a agrupar deseada
  for(let i = 0; i < female; i= i+quantity){
    const groupArray = femaleArray.slice(i, i+quantity);
    arrayByQuantity.push(groupArray);
  }

  //Recorro el nuevo array y llamo a la funcion de imprimir rango para que me vaya devuelva la cantidad dentro de cada grupo y su distribucion grafica.
  arrayByQuantity.forEach(( group, i ) => {
    const print = document.getElementById('group-data');
    print.innerHTML+= '<h3> Grupo ' + Number(i+1) + '</h3>';
    print.innerHTML += '<h4> Cantidad: '+ group.length +'</h4>';
    printRank(group, 'group-data');
  })
}