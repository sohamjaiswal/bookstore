<svelte:head>
    <title>
        Login - Book Shelf
    </title>
</svelte:head>

<section class="container flex items-center justify-center h-[calc(100vh-256px)]">
    <form class="flex flex-col gap-9 card p-9 max-w-xl md:w-1/2">
        <h1 class="h1 text-center">Login</h1>
        <input type="email" name="email" id="email" placeholder="Email..." class="input border-0 rounded-2xl px-6 py-4">
        <input type="password" name="pwd" id="pwd" placeholder="Password..." class=" input border-0 rounded-2xl px-6 py-4">
        <input type="submit" value="Continue" class="btn variant-filled max-w-fit place-self-center cursor-pointer font-bold">
        <a href="/sign-up" class="text-center">Don't have an account?</a>
    </form>
</section>