<script>
import { getContext } from 'svelte';
  import Table from "./Table.svelte";
  import Form from "./Form.svelte";
  import Chart from "./Chart.svelte";

  const { open } = getContext('simple-modal');

  const showForm = () => {
    open(Form, {}, {
				closeButton: true,
    		closeOnEsc: true,
    		closeOnOuterClick: true,
			});
  };

</script>

<div class="container-fluid">
  <div class="row row-cols-2">
    <div class="col">
      <h1 class="mt-2 mb-1">My personal costs</h1>
      <button type="button" class="btn btn-raised btn-primary mt-3 mb-3" on:click={showForm}>
        ADD NEW ITEM +
      </button>
      <div>
        <Table />
      </div>
    </div>
    <div class="col" >
    <div>
    <Chart />
    </div>
    </div>
  </div>
</div>