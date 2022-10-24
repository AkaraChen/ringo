<template>
    <Button @click="drawer({})">Open</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue"
import { drawer } from "../../src/index"
import "../../style/drawer/default.css"
</script>