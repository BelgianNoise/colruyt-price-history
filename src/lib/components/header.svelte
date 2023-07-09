<script>
  import SearchSVG from "$lib/svgs/search.svelte";

  let searchValue = "";

  const search = () => {
    if (searchValue?.length > 1) {
      window.location.href = `/search/${searchValue}`;
    }
  };
</script>

<div id="header">
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    src="/colruyt-white.png"
    alt="colruyt logo"
    on:click={() => window.location.href = "/"}
  />
  <div id="input-container">
    <input
      type="text"
      bind:value={searchValue}
      placeholder="cola zero"
      on:keydown={(e) => {
        if (e.key === "Enter") search();
      }}
    />
    <button
      on:click={() => search()}
    >
      <span>zoeken</span>
      <SearchSVG />
    </button>
  </div>
</div>

<style>
  #header {
    background-color: var(--color-colruyt);
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: var(--m-normal);
    padding: var(--m-normal);

    position: sticky;
    top: 0;
    z-index: 1;
  }
  #header > * {
    align-self: center;
  }
  img {
    max-width: min(100%, 300px);
    max-height: 70px;
    cursor: pointer;
  }
  #input-container {
    display: flex;
    flex-direction: row;
    gap: 0;
  }
  #input-container > input {
    border-radius: calc(var(--m-small)*2 + var(--font-size-normal));
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    width: calc(100% - 2*var(--m-normal));
    flex: 1;
    background-color: var(--color-background);
    padding: var(--m-small) var(--m-normal);
    font-size: var(--font-size-normal);
  }
  #input-container > button {
    border-radius: calc(var(--m-small)*2 + var(--font-size-normal));
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    background-color: var(--color-background);
    padding: var(--m-small);
    font-size: var(--font-size-normal);
    
    display: flex;
    align-items: center;
    gap: var(--m-small);
    color: var(--color-background);

    border: 1px solid var(--color-background);
    background: var(--color-colruyt);
  }
  #input-container > button > span {
    display: none;
    margin-right: var(--font-size-small);
  }
  
  @media (min-width: 700px) {
    #header {
      grid-template-columns: 1fr 2fr 1fr;
    }
    #input-container > button > span {
      margin: 0;
      display: inline-block;
    }
  }
</style>
