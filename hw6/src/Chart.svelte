<script>
  import { afterUpdate } from "svelte";
  import { results } from "./store.js";
  import Chart from "chart.js";

  afterUpdate(async () => {
    render();
  });

  let render = () => {
    let ctx = document.getElementById("chart").getContext("2d");
    let chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: $results.map(res => res.category),
        datasets: [
          {
            label: "Prices by categories",
            backgroundColor: $results.map(res => res.color),
            borderColor: $results.map(res => res.color),
            data: $results.map(res => res.value)
          }
        ]
      },
      options: {
          legend: {
              display: true
          }
      }
    });
  };
</script>

<canvas id="chart" />
