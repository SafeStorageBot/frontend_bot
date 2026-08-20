<script lang="ts">
  import { t } from '../lib/i18n';
  import { goHome, showToast } from '../lib/nav.svelte';
  import { hapticNotification } from '../lib/telegram';
  import type { DecryptedPasswordItem } from '../lib/types';

  let { items }: { items: DecryptedPasswordItem[] } = $props();

  async function copy(item: DecryptedPasswordItem) {
    if (!item.password) {
      return;
    }
    try {
      await navigator.clipboard.writeText(item.password);
      hapticNotification('success');
      showToast(t('COPIED'));
    } catch {
      hapticNotification('error');
      showToast(t('COPY_ERROR'));
    }
  }
</script>

<section class="actions">
  <button class="btn btn-stroked" onclick={goHome}>{t('HOME')}</button>
</section>

<div class="list">
  {#each items as item (item.id)}
    <div class="item" class:failed={item.error}>
      <div class="item-body">
        <h2 class="item-title">{item.title}</h2>
        {#if item.error}
          <p class="item-error">{t('MASTER_KEY_ERROR')}</p>
        {:else}
          <p class="item-secret">{item.password}</p>
        {/if}
      </div>
      {#if !item.error}
        <button class="btn btn-stroked copy" onclick={() => copy(item)}>{t('COPY')}</button>
      {/if}
    </div>
  {/each}
</div>

<style>
  .list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    background: var(--bg-secondary);
  }

  .item.failed {
    opacity: 0.75;
  }

  .item-body {
    flex: 1;
    min-width: 0;
  }

  .item-title {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-secret {
    margin: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 14px;
    word-break: break-all;
  }

  .item-error {
    margin: 0;
    font-size: 13px;
    color: var(--destructive);
  }

  .copy {
    flex-shrink: 0;
    padding: 8px 12px;
    font-size: 13px;
  }
</style>
