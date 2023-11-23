<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	export let data
	let search = ''
	$: search
	$: displayBooks = data.books
	const searchBooks = () => {
		displayBooks = search.length > 0 ? data.books.filter(book => book.title.toLowerCase().includes(search.toLowerCase())) : data.books
		console.log(displayBooks)
	}

	const handleAddToCart: SubmitFunction = ({formElement, formData, action, cancel, submitter}) => {
		return async ({ result, update }) => {
			if (result.type === "error") {
				const t: ToastSettings = {
					message: "An error occurred.",
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				update({
					reset: false
				})
			}
			else if (result.type === "failure") {
				if (result.status === 400) {
					const t: ToastSettings = {
						message: "A required field was missing",
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
					update({
						reset: false
					})
				} 
			}
			else if (result.type === "success") {
				console.log("hit")
				const t: ToastSettings = {
					message: "Added to cart successfully.",
					background: 'variant-filled-primary'
				};
				toastStore.trigger(t);
			}
		}
	}
</script>

<svelte:head>
	<title>Book Shelf</title>
</svelte:head>

<section class="container py-10 flex flex-col gap-8">
	<h1 class="h1 text-center">
		Welcome to Book Shelf 📚
	</h1>
	<p class="text-center">
		Book Shelf is a simple book store where you can buy books.
	</p>
	<input bind:value={search} class="input" type="text" placeholder="🔍 Search books 📚" on:input={() => searchBooks()} >
	{#if search.length > 0}
	<ul class="flex py-10">
		{#each displayBooks as book}
			<li>
				<div class="card card-hover bg-initial modal p-4 m-2 gap-4 rounded-md flex-col md:h-fit flex items-center lg:w-fit justify-center">
					<div class="details">
						<div class="flex flex-col gap-5 items-center lg:flex-col">
							<img src={`${book.image}`} alt="Book cover" class="rounded-xl">
							<span class="flex gap-1">
								<strong>
									Title:
								</strong>
								<p class="p">
									{book.title}
								</p>
							</span>
							<span class="flex gap-1">
								<strong>
									Author:
								</strong>
								<p class="p">
									{book.author}
								</p>
							</span>
							<span class="flex gap-1">
								<strong>
									Description:
								</strong>
								<p class="p">
									{book.description}
								</p>
							</span>
							<span class="flex gap-1">
								<strong>
									Price:
								</strong>
								<p class="p">
									{book.price}
								</p>
							</span>
						</div>
					</div>
					<form action="" method="POST">
						<input type="hidden" name="id" value={book.id} />
						<button class="btn variant-filled px-10" type="submit">
							Add to Cart
						</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
	{:else}
	<ul class="flex py-10">
		{#each displayBooks as book}
			<li>
				<div class="card card-hover bg-initial modal p-4 m-2 gap-4 rounded-md flex-col md:h-fit flex items-center lg:w-fit justify-center">
					<div class="details">
						<div class="flex flex-col gap-5 items-center lg:flex-col">
							<img src={`${book.image}`} alt="Book cover" class="rounded-xl">
							<span class="flex gap-1">
								<strong>
									Title:
								</strong>
								<p class="p">
									{book.title}
								</p>
							</span>
							<span class="flex gap-1">
								<strong>
									Author:
								</strong>
								<p class="p">
									{book.author}
								</p>
							</span>
							<span class="flex gap-1">
								<strong>
									Description:
								</strong>
								<p class="p">
									{book.description}
								</p>
							</span>
							<span class="flex gap-1">
								<strong>
									Price:
								</strong>
								<p class="p">
									{book.price}
								</p>
							</span>
								<form action="?/addToCart" method="POST" use:enhance={handleAddToCart}>
									<input type="hidden" name="id" value={book.id} />
									<button class="btn variant-filled px-10" type="submit">
										Add to Cart
									</button>
								</form>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>
	{/if}
</section>
