<template lang="pug">
.test Первый див
	.test1(
			display='block'
		) {{sum}} 
		p#test2 Текст 1
.card.flex.justify-content-center
	Button(label="Submit")
</template>

<script setup lang="ts">
const a = 4;
const b = 5;
const sum = a + b;
</script>

<style scoped></style>
