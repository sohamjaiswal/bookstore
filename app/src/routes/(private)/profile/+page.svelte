<script lang="ts">
	import { page } from "$app/stores";
</script>
<div class="lg:flex flex-col snap-start items-center gap-8">
	{#if $page.data.user}
  <h1 class="h1">
    Signed in as {$page.data.user.email}
  </h1>
	{:else}
	You are not signed in
	{/if}
  <div class="flex flex-col gap-4">
    To control your sessions, go to 
    <a href="/sessions" class="btn variant-outline-primary"> Sessions </a>
    To change password go to 
    <a href="/settings" class="btn variant-outline-secondary"> Settings </a>
  </div>
</div>