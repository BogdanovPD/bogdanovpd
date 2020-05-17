<script>
  import { results } from "./store.js";
  import Row from "./RowItem.svelte";
</script>

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Category</th>
      <th scope="col">Value</th>
    </tr>
  </thead>
  <tbody>
    {#each $results as result}
      <Row
        num={result.num}
        date={result.date.toLocaleDateString()}
        category={result.category}
        value={result.value} />
    {/each}
  </tbody>
</table>
