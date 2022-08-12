<script lang="ts" context="module">
	import type {Page} from "@sveltejs/kit"

	// context="module" ====> run before render
	type Post = {
		title: string
		date: string
		body: string
		status: number
	}
	export async function load({params, status}: Page) {
		const post = {
			title: params.slug,
			date: "2022-10-22",
			body: "lorem Ipsum",
			status,
		}
		return {
			props: {post},
		}
	}
</script>

<script lang="ts">
	export let post: Post
</script>

<h1>Posts</h1>
<p>
	{post.title}
</p>
<p>
	{post.date}
</p>
<p>
	{post.body}
</p>
<p>
	{post.status}
</p>
