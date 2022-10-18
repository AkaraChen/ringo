<template>
    <Button @click="$notice({text: 'this is a message.'})">notice</Button>
    <Button @click="$notice({type: 'warning',text:'Warning, this is a warning message.'})">Warning</Button>
    <Button @click="$notice({type: 'error',text:'Oops, this is a error message.'})">Error</Button>
    <Button @click="$notice({type: 'success',text: 'Congrats, this is a success message.'})">Success</Button>
</template>

<script lang="ts" setup>
import { notice, NoticeProps } from "../../src/index"
import "../../style/notice/default.css"
import Button from "./Button.vue"

const $notice = (arg?: Partial<NoticeProps>) => {
    notice(Object.assign({ text: 'Notice' }, arg))
}
</script>

<style scoped>

</style>