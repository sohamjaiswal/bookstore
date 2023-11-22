<script lang="ts">
    let pwd: string;
    let cnfpwd: string;

    const validate = () => {
        if (pwd !== cnfpwd) {
            console.log("pwd and cnfpwd are not same")
        }
    }

    const register = () => {

    }
</script>

<svelte:head>
    <title>
        Sign Up - Book Shelf
    </title>
</svelte:head>

<section class="container flex items-center justify-center h-[calc(100vh-256px)]">
    <form class="flex flex-col gap-9 card p-9 max-w-xl md:w-1/2">
        <h1 class="h1 text-center">Sign Up</h1>
        <input type="email" name="email" id="email" placeholder="Email..." class="input border-0 rounded-2xl px-6 py-4">
        <input type="password" bind:value={pwd} name="pwd" id="pwd" placeholder="Password..." class="input border-0 rounded-2xl px-6 py-4">
        <input type="password" bind:value={cnfpwd} name="pwd" id="pwd" placeholder="Confirm Password..." class="input border-0 rounded-2xl px-6 py-4" on:input={validate}>
        <input type="submit" value="Continue" class="btn variant-filled max-w-fit place-self-center cursor-pointer font-bold" on:click|preventDefault={() => {
            validate();
            register();
        }}>
        <a href="/login" class="text-center">Already have an account?</a>
    </form>
</section>