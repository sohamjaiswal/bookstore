<script lang="ts">

	import { page } from "$app/stores";

</script>
<div class="lg:flex snap-start items-center">
	{#if $page.data.user}
  <h1 class="h1">
    Signed in as {$page.data.user.email}
  </h1>
	{:else}
	You are not signed in
	{/if}
</div>