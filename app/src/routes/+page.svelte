<script lang="ts">
	export let data;
</script>

<div class="lg:flex snap-start items-center">
	<div class="prose text-inherit mb-20">
		<svelte:component this={data.content} />
	</div>
</div>
