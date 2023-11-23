<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';

  export let data
</script>

<svelte:head>
  <title>Manage Books - Book Shelf</title>
</svelte:head>

<section class="container">
  <form class="card p-10 flex flex-col gap-4" action="?/createBook" method="post" use:enhance>
    <h1 class="h1 text-center">Add a book</h1>
    <div class="form-control">
      <label class="label">
        Title
      </label>
      <input class="input" type="text" name="title" />
    </div>
    <div class="form-control">
      <label class="label">
        Author
      </label>
      <input class="input" type="text" name="author" />
    </div>
    <div class="form-control">
      <label class="label">
        Description
      </label>
      <textarea class="input textarea" name="description"></textarea>
    </div>
    <div class="form-control">
      <label class="label">
        Price
      </label>
      <input class="input" type="number" name="price" />
    </div>
    <div class="form-control">
      <label class="label">
        Quantity
      </label>
      <input class="input" type="number" name="quantity" />
    </div>
    <div class="form-control">
      <label class="label">
        Image
      </label>
      <input class="input" type="text" name="image" />
    </div>
    <button type="submit" class="btn variant-filled-primary">
      Create
    </button>
  </form>
  
  {#await data.lazy.allBooks}
    <p>loading...</p>
    {:then allBooks}
      {#if allBooks.length <= 0}
        <p class="text-center py-10">
          There are no books, please create. 
        </p>
      {:else}
        <h1 class="h1 py-10 pb-0">Books:</h1>
        <ul class="flex py-10">
          {#each allBooks as book}
            <li>
              <div class="card card-hover bg-initial modal p-4 m-2 gap-4 rounded-md flex-col md:h-fit flex items-center lg:w-fit justify-center">
                <div class="details">
                  <div class="flex flex-col gap-5 items-center lg:flex-col">
                    <img src={book.image} alt="Book cover" class="rounded-xl">
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
                <form action="?/deleteBook" method="POST">
                  <input type="hidden" name="id" value={book.id} />
                  <button class="btn variant-filled px-10" type="submit">
                    Delete
                    <!-- <Icon icon="mdi:delete" /> -->
                  </button>
                </form>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    {:catch error}
      <p>error: {error.message}</p>
  {/await}
      </section>