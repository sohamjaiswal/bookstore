<script lang="ts">
	import { enhance } from "$app/forms";
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from "@sveltejs/kit";
  const toastStore = getToastStore();
  const handleSubmit: SubmitFunction = ({formElement, formData, action, cancel, submitter}) => {
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
        } else if (result.status === 401) {
          const t: ToastSettings = {
              message: "User with email password combination not found.",
              background: 'variant-filled-error'
          };
          toastStore.trigger(t);
          update({
            reset: false
          })
        }
      }
      else if (result.type ===  "redirect") {
        update()
      }
    }
  }
</script>

<svelte:head>
    <title>
        Login - Book Shelf
    </title>
</svelte:head>

<section class="container flex items-center justify-center h-[calc(100vh-256px)]">
    <form class="flex flex-col gap-9 card p-9 max-w-xl md:w-1/2" method="post" use:enhance={handleSubmit}>
        <h1 class="h1 text-center">Login</h1>
        <input type="email" name="email" id="email" placeholder="Email..." class="input border-0 rounded-2xl px-6 py-4">
        <input type="password" name="password" id="pwd" placeholder="Password..." class=" input border-0 rounded-2xl px-6 py-4">
        <input type="submit" value="Continue" class="btn variant-filled max-w-fit place-self-center cursor-pointer font-bold">
        <a href="/sign-up" class="text-center">Don't have an account?</a>
    </form>
</section>