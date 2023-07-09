<script lang="ts">
  import type { SearchLoadResults } from "./+page.server";

  export let data: SearchLoadResults;
</script>

<div>
  {data.products.length}
</div>

<style>

</style>
