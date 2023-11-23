<script lang="ts">
	import { enhance } from "$app/forms";
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from "@sveltejs/kit";
  const toastStore = getToastStore();

  let pwd: string;
  let cpwd: string;

  const handleSubmit: SubmitFunction = ({formElement, formData, action, cancel, submitter}) => {
    if (pwd !== cpwd) {
      const t: ToastSettings = {
          message: 'Passwords do not match.',
          background: 'variant-filled-error'
      };
      toastStore.trigger(t);
      cancel();
    }
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
      else if (result.type === "success") {
        const t: ToastSettings = {
            message: "Updated Successfully.",
            background: 'variant-filled-primary'
        };
        toastStore.trigger(t);
        update({
          reset: true,
          invalidateAll: true
        })
      }
    }
  }
</script>

<svelte:head>
    <title>
        Change Password - Book Shelf
    </title>
</svelte:head>

<section class="container flex items-center justify-center h-[calc(100vh-256px)]">
    <form class="flex flex-col gap-9 card p-9 max-w-xl md:w-1/2" method="post" use:enhance={handleSubmit}>
        <h1 class="h1 text-center">Change Password</h1>
        <input type="password" bind:value={pwd} name="password" id="pwd" placeholder="New Password..." class=" input border-0 rounded-2xl px-6 py-4">
        <input type="password" bind:value={cpwd} name="confirmPassword" id="cnfpwd" placeholder="Confirm Password..." class=" input border-0 rounded-2xl px-6 py-4">
        <input type="submit" value="Continue" class="btn variant-filled max-w-fit place-self-center cursor-pointer font-bold">
    </form>
</section>