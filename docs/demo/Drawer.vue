<template>
    <Button @click="drawer({width: '70vw'})">Open</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue"
import { drawer } from "../../src/index"
import "../../style/drawer/default.css"
</script>