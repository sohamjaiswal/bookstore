<script lang="ts">
	import Icon from '@iconify/svelte';
  export let data
  console.log(data)
</script>

<ul>
  {#each data.sessions as session}
    <li>
      <div class="card card-hover bg-initial modal p-4 m-2 gap-4 rounded-md md:flex-col md:h-fit lg:flex-row lg:h-24 flex items-center lg:w-fit">
        <div class="details">
          <div class="flex flex-col gap-1 items-center lg:flex-row">
            <span class="flex gap-1">
              <strong>
                Created At:
              </strong>
              <p class="p">
                {session.createdAt}
              </p>
            </span>
          </div>
        </div>
        <form class=" w-12" action="?/revoke" method="POST">
          <input type="hidden" name="id" value={session.id} />
          <button class="btn btn-icon" type="submit">
            <Icon icon="mdi:delete" />
          </button>
        </form>
      </div>
    </li>
  {/each}
</ul>