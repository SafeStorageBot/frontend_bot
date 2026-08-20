<script lang="ts">
  import { nav, goHome, toast } from './lib/nav.svelte';
  import { onBackButton, setBackButtonVisible } from './lib/telegram';
  import Home from './screens/Home.svelte';
  import Add from './screens/Add.svelte';
  import Verify from './screens/Verify.svelte';
  import Result from './screens/Result.svelte';

  onBackButton(goHome);

  $effect(() => {
    setBackButtonVisible(nav.view.name !== 'home');
  });
</script>

<main>
  {#if nav.view.name === 'home'}
    <Home />
  {:else if nav.view.name === 'add'}
    <Add />
  {:else if nav.view.name === 'verify'}
    <Verify view={nav.view} />
  {:else if nav.view.name === 'result'}
    <Result items={nav.view.items} />
  {/if}
</main>

{#if toast.message}
  <div class="toast" role="status">{toast.message}</div>
{/if}
