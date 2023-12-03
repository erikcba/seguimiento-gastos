const ctx = document.getElementById('myChart')
import data from './data.mjs';


let datosAlmacenados = JSON.parse(localStorage.getItem('datos') || data);

const today = (new Date(new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })).getDay() + 6) % 7;

const defaultColor = 'hsl(10, 79%, 65%)';
const currentDayColor = 'hsl(200, 79%, 65%)';

const btnAgregar = document.getElementById('btnAgregar');
const totalGasto = document.getElementById('totalGasto')

document.addEventListener("DOMContentLoaded", function () {
  console.log(datosAlmacenados)
  totalGasto.innerHTML = `$ ${total}`;
}
)
let total = datosAlmacenados.reduce((acc, cur) => acc + cur.amount, 0);

let chartDatos = datosAlmacenados.map(row => row.amount)

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Gasto',
      data: chartDatos,
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

  if (gastoNumero > 0) {
    datosAlmacenados[today].amount += gastoNumero;

    actualizarChart()

    localStorage.setItem('datos', JSON.stringify(datosAlmacenados))

    alert('Gasto agregado')
    document.getElementById('gastoNumero').value = '';

    total = datosAlmacenados.reduce((acc, cur) => acc + cur.amount, 0);
    totalGasto.innerHTML = `$ ${total}`;
  } else {
    Swal.fire({
      customClass: {
        confirmButton: 'swalBtnColor'
      },
      title: 'Error!',
      text: 'Debes agregar un gasto',
      icon: 'error',
      confirmButtonText: 'Entendido'
    })
  }


}


function actualizarChart() {
  myChart.data.datasets[0].data = datosAlmacenados.map(row => row.amount);
  myChart.data.datasets[0].backgroundColor = datosAlmacenados.map((row, index) => index === today ? currentDayColor : defaultColor);
  myChart.update();
}

btnAgregar.addEventListener('click', agregarGasto)