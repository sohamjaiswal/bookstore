<script lang="ts">
	import { enhance } from '$app/forms';
    import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
    const toastStore = getToastStore();
			
    let email: string;
    let pwd: string;
    let cnfpwd: string;

    const handleSubmit: SubmitFunction = ({formElement, formData, action, cancel, submitter}) => {
        if (pwd !== cnfpwd) {
            const t: ToastSettings = {
                message: 'Passwords do not match.',
                background: 'variant-filled-error'
            };
            toastStore.trigger(t);
            cancel();
        }
        if (!!email) {
            const t: ToastSettings = {
                message: 'Enter an email.',
                background: 'variant-filled-error'
            };
            toastStore.trigger(t);
            cancel();
        }
        return async ({ result, update }) => {
			if (result.type === "error") {
                console.log(result.error)
                const t: ToastSettings = {
                    message: "An error occurred.",
                    background: 'variant-filled-error'
                };
                toastStore.trigger(t);
            }
            else if (result.type === "failure") {
                if (result.data?.dup) {
                    const t: ToastSettings = {
                        message: "Email already exists.",
                        background: 'variant-filled-error'
                    };
                    toastStore.trigger(t);
                } else {
                    const t: ToastSettings = {
                        message: "A required field was missing",
                        background: 'variant-filled-error'
                    };
                    toastStore.trigger(t);
                }
            }
            else if (result.type === "redirect") {
                const t: ToastSettings = {
                    message: "Account created successfully.",
                    background: 'variant-filled-success'
                };
                toastStore.trigger(t);
                window.location.href = "/";
            }
		};
    }
</script>

<svelte:head>
    <title>
        Sign Up - Book Shelf
    </title>
</svelte:head>

<section class="container flex items-center justify-center h-[calc(100vh-256px)]">
    <form class="flex flex-col gap-9 card p-9 max-w-xl md:w-1/2" method="post" use:enhance={handleSubmit}>
        <h1 class="h1 text-center">Sign Up</h1>
        <input type="email" name="email" id="email" placeholder="Email..." class="input border-0 rounded-2xl px-6 py-4" required>
        <input type="password" bind:value={pwd} name="password" id="pwd" placeholder="Password..." class="input border-0 rounded-2xl px-6 py-4" required>
        <input type="password" bind:value={cnfpwd} name="pwd" id="pwd" placeholder="Confirm Password..." class="input border-0 rounded-2xl px-6 py-4" required>
        <input type="submit" value="Continue" class="btn variant-filled max-w-fit place-self-center cursor-pointer font-bold">
        <a href="/login" class="text-center">Already have an account?</a>
    </form>
</section>