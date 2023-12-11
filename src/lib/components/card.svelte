<script lang="ts">
  export let hideHeader = false;
  export let hideBody = false;
  export let hideFooter = false;
  export let onClick: undefined | (() => void) = undefined;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="content"
  class:pointer={onClick !== undefined}
  on:click={() => onClick ? onClick() : undefined}
>
  <div id="header" class:hide={hideHeader}>
    <slot name="header" />
  </div>
  <div id="body" class:hide={hideBody}>
    <slot name="body" />
  </div>
  <div id="footer" class:hide={hideFooter}>
    <slot name="footer" />
  </div>
</div>

<style>
  #content {
    display: flex;
    flex-direction: column;
    gap: var(--m-small);
    padding: var(--m-small) var(--m-normal);
    background-color: var(--color-background);
    justify-content: space-between;
  }
  #header, #body, #footer {
    padding: 0;
    overflow: hidden;
    max-width: 100%;
  }
  .hide {
    display: none;
  }
  .pointer {
    cursor: pointer;
  }
  .pointer:hover {
    background-color: var(--color-colruyt-lighter)!important;
  }
</style>
