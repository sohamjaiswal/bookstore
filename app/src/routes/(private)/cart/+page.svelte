<script lang="ts">
	export let data
  console.log('lol', data.books, data.totalPrice)
	let search = ''
	$: search
    let displayBooks = data.books;
    let total = 0;
    displayBooks.forEach((book) => {
        total += book.price;
    })
</script>

<svelte:head>
	<title>Book Shelf</title>
</svelte:head>

<section class="container py-10 flex flex-col">
	<h1 class="h1 text-center">
		Cart
	</h1>
    <div class="main-container flex flex-row flex-wrap-reverse w-[100%]" style="align-items: start;">
	    <ul class="container flex py-10 max-w-[70%] flex-wrap">
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
	    					<button class="btn variant-outline px-10" type="submit">
                                Remove from cart
	    					</button>
	    				</form>
	    			</div>
	    		</li>
	    	{/each}
	    </ul>
        <div class="container card summary p-10 mt-12 flex flex-col gap-5 max-w-[80%] mx-auto md:max-w-fit lg:max-w-[20%] h-fit">
            <h2 class="h2">Summary:</h2>
            <span class="flex gap-3">
                <strong>Total:</strong><p>₹ {total}</p>
            </span>
	    	<form action="" method="POST" class="mx-auto mt-5">
	    		<button class="btn variant-filled-primary px-10" type="submit">
                    Checkout
	    		</button>
	    	</form>
        </div>
    </div>
</section>
