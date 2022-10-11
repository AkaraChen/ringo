<template>
    <Button @click="$message()">Info</Button>
    <Button @click="$message({type: 'warning'})">Warning</Button>
    <Button @click="$message({type: 'error'})">Error</Button>
    <Button @click="$message({type: 'success'})">Success</Button>
</template>

<script lang="ts" setup>
import { message, MessageProps } from "../../src/index"
import "../../style/message/default.css"
import Button from "./Button.vue"

const lorem =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi fugit fuga incidunt.';

const $message = (arg?: Partial<MessageProps>) => {
    message(Object.assign({ text: lorem, showClose: true }, arg))
}
</script>

<style scoped>

</style>