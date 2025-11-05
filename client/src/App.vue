<template>
    <div id="app">
        <RouterView name="navbar" />
        <main class="main-content">
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
// nothing needed here yet
</script>

<style>
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.main-content {
    padding: 1rem;
}
@media (max-width: 768px) {
    .main-content {
        padding: 0rem;
    }
}
</style>
