<template>
    <button class="ringo-btn">
        <slot />
    </button>
</template>

<style>
.ringo-btn {
    background-color: var(--c-text-accent);
    padding: 12px 16px;
    font-size: 16px;
    border: none;
    color: white;
    margin-right: 4px;
    border-radius: 4px;
}
</style>