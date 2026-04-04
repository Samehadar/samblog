<template>
  <div class="filter-bar">
    <select v-model="selectedLang" class="filter-select">
      <option value="">{{ allLanguagesLabel }}</option>
      <option v-for="l in languages" :key="l" :value="l">{{ l.toUpperCase() }}</option>
    </select>

    <select v-model="selectedTag" class="filter-select">
      <option value="">{{ allTagsLabel }}</option>
      <option v-for="tag in allTags" :key="tag" :value="tag">#{{ tag }}</option>
    </select>

    <span v-if="selectedLang || selectedTag" class="filter-count">
      {{ filtered.length }} {{ filtered.length === 1 ? 'post' : 'posts' }}
    </span>
  </div>

  <div v-if="filtered.length === 0" class="no-results">
    {{ noResultsLabel }}
  </div>

  <div v-else class="post-list">
    <article v-for="post in filtered" :key="post.slug" class="post-item">
      <a :href="post.href" class="post-item-link">
        <div class="post-item-meta">
          <span :class="['lang-pill', `lang-${post.locale}`]">{{ post.locale.toUpperCase() }}</span>
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span v-if="post.readingTime">&middot; {{ post.readingTime }} {{ readingTimeLabel }}</span>
        </div>
        <h2 class="post-item-title">{{ post.title }}</h2>
        <p class="post-item-desc">{{ post.description }}</p>
        <div v-if="post.tags.length" class="post-item-tags">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">#{{ tag }}</span>
        </div>
      </a>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Post {
  slug: string;
  title: string;
  date: string;
  locale: string;
  tags: string[];
  description: string;
  readingTime?: number;
  href: string;
}

const props = defineProps<{
  posts: Post[];
  languages: string[];
  allLanguagesLabel: string;
  allTagsLabel: string;
  noResultsLabel: string;
  readingTimeLabel: string;
  pageLocale: string;
}>();

const selectedLang = ref("");
const selectedTag = ref("");

const allTags = computed(() => {
  const tags = new Set<string>();
  for (const post of props.posts) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort();
});

const filtered = computed(() => {
  return props.posts.filter((p) => {
    if (selectedLang.value && p.locale !== selectedLang.value) return false;
    if (selectedTag.value && !p.tags.includes(selectedTag.value)) return false;
    return true;
  });
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(props.pageLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-select {
  font-family: var(--font-serif);
  font-size: 1.087rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-bg-card);
  color: var(--color-text);
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s ease;
}
.filter-select:focus { border-color: var(--color-accent); }

.filter-count {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--color-text-muted);
}

.no-results {
  text-align: center;
  padding: 3rem 0;
  color: var(--color-text-muted);
  font-family: var(--font-serif);
}

.post-list {
  display: flex;
  flex-direction: column;
}

.post-item {
  border-bottom: 1px solid var(--color-border);
}
.post-item:last-child { border-bottom: none; }

.post-item-link {
  display: block;
  padding: 1.25rem 0;
  text-decoration: none;
}
.post-item-link:hover .post-item-title { color: var(--color-accent); }

.post-item-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-serif);
  font-size: 1.087rem;
  color: var(--color-text-muted);
  margin-bottom: 0.375rem;
}

.lang-pill {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.1em 0.4em;
  border-radius: 3px;
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border);
}
.lang-ru { color: #3b82f6; }
.lang-en { color: #10b981; }
.lang-pl { color: #f43f5e; }

.post-item-title {
  font-family: var(--font-serif);
  font-weight: bold;
  font-size: 1.4rem;
  color: var(--color-text);
  margin: 0 0 0.25rem;
  line-height: 1.3;
  transition: color 0.15s ease;
}

.post-item-desc {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.5rem;
}

.post-tag {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--color-text-faint);
  background-color: var(--color-bg-alt);
  padding: 0.15em 0.5em;
  border-radius: 4px;
}
</style>
