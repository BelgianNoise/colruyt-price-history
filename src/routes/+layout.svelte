<script>
  import "./styles.css"
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";
</script>

<div id="container">
  <Header />
  <div id="slot-container">
    <slot />
  </div>
  <Footer />
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  #slot-container {
    flex: 1;
  }
</style>
