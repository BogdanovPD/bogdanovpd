<script>
  import { add } from "./store.js";
  import { getContext } from "svelte";
  const { close } = getContext("simple-modal");

  let category;
  let value;
  
</script>

<div>
  <div>
    <label for="category">Category</label>
    <input
      bind:value={category}
      type="text"
      class="form-control"
      id="category"
      placeholder="Enter category's name" />
    <label for="value">Quantity</label>
    <input
      bind:value={value}
      type="number"
      class="form-control"
      id="value"
      placeholder="Enter quantity" />
  </div>
  <button
    type="button"
    class="btn btn-raised btn-primary mt-2 mb-1"
    on:click={() => {
      add(category, value);
      close();
    }}>
    Add
  </button>
</div>
