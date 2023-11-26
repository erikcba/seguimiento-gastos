const ctx = document.getElementById('myChart')
import data from './data.mjs';

let datosAlmacenados = JSON.parse(localStorage.getItem('datos')) || [];
const today = (new Date(new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })).getDay() + 6) % 7;

const defaultColor = 'hsl(10, 79%, 65%)';
const currentDayColor = 'hsl(200, 79%, 65%)';

const btnAgregar = document.getElementById('btnAgregar');
const totalGasto = document.getElementById('totalGasto')

console.log(today)

console.log(datosAlmacenados)

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Gasto',
      data: datosAlmacenados.map(row => row.amount),
      backgroundColor: datosAlmacenados.map((row, index) => index === today ? currentDayColor : defaultColor),
      borderRadius: 6,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        display: false
      }
    },
    legend: {
      display: false
    }

  }
});

function agregarGasto(event) {
  event.preventDefault()
  const gastoNumero = parseFloat(document.getElementById('gastoNumero').value)

  datosAlmacenados[today].amount += gastoNumero;

  myChart.data.datasets[0].data = datosAlmacenados.map(row => row.amount);
  myChart.data.datasets[0].backgroundColor = datosAlmacenados.map((row, index) => index === today ? currentDayColor : defaultColor);
  myChart.update();

  localStorage.setItem('datos', JSON.stringify(datosAlmacenados))

  alert('Gasto agregado')
  document.getElementById('gastoNumero').value = '';

  const total = datosAlmacenados.reduce((acc, cur) => acc + cur.amount, 0);
  totalGasto.innerHTML = `$ ${total}`;
}



btnAgregar.addEventListener('click', agregarGasto)

