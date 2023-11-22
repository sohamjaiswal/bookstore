<script lang="ts">
	import { page } from "$app/stores";

	export let data;
</script>

<div class="lg:flex snap-start items-center">
	{#if $page.data.user}
	Hi {$page.data.user.email}
	{:else}
	You are not signed in
	{/if}
</div>
