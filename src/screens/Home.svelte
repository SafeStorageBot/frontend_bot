<script lang="ts">
  import { api } from '../lib/api';
  import { t, formatDate } from '../lib/i18n';
  import { go, showToast } from '../lib/nav.svelte';
  import { hapticNotification } from '../lib/telegram';
  import type { BotHttpResponse, PasswordItem, UserInfo } from '../lib/types';
  import ErrorNote from '../components/ErrorNote.svelte';

  let loading = $state(true);
  let info = $state<BotHttpResponse<UserInfo> | null>(null);
  let list = $state<BotHttpResponse<PasswordItem[]> | null>(null);
  let selected = $state<Record<string, PasswordItem>>({});
  let removing = $state(false);

  const selectedItems = $derived(Object.values(selected));
  const userInfo = $derived(info?.error ? undefined : info?.response);
  const items = $derived(list?.error ? undefined : list?.response);
  const canAdd = $derived(
    !!userInfo && (!!userInfo.until || userInfo.passwords < userInfo.limit)
  );

  async function load() {
    loading = true;
    selected = {};
    [info, list] = await Promise.all([api.info(), api.list()]);
    loading = false;
  }

  load();

  function toggle(item: PasswordItem) {
    if (selected[item.id]) {
      delete selected[item.id];
    } else {
      selected[item.id] = item;
    }
  }

  function reveal() {
    go({ name: 'verify', mode: 'decrypt', forDecrypt: selectedItems });
  }

  async function remove() {
    removing = true;
    const results = await Promise.all(selectedItems.map((item) => api.remove(item)));
    removing = false;
    if (results.some((result) => result.error)) {
      hapticNotification('error');
      showToast(t('REMOVE_ERROR'));
    }
    await load();
  }
</script>

{#if loading}
  <div class="center"><div class="spinner"></div></div>
{:else if !userInfo}
  <ErrorNote />
{:else}
  <section class="actions">
    <button class="btn" disabled={!canAdd} onclick={() => go({ name: 'add' })}>
      {t('ADD')}
    </button>
    <button class="btn" disabled={selectedItems.length === 0} onclick={reveal}>
      {t('REVEAL')}
    </button>
    <button
      class="btn btn-danger"
      disabled={selectedItems.length === 0 || removing}
      onclick={remove}
    >
      {t('REMOVE')}
    </button>
  </section>

  <p class="info">
    {#if userInfo.until}
      {t('UNLIMITED_VERSION_INFO')}: {formatDate(userInfo.until)}
    {:else}
      {t('LIMITED_VERSION_INFO')} {userInfo.limit} {t('LIMITED_VERSION_INFO_PASSWORDS')}
    {/if}
  </p>

  {#if !items}
    <ErrorNote />
  {:else}
    <div class="list">
      <h3 class="list-header">
        {t('LIST_INFO')}
        {items.length}/{userInfo.until ? '∞' : userInfo.limit}
      </h3>
      {#if items.length === 0}
        <p class="hint">{t('LIST_INFO_TIP')}</p>
      {/if}
      {#each items as item (item.id)}
        <label class="row">
          <input
            type="checkbox"
            checked={!!selected[item.id]}
            onchange={() => toggle(item)}
          />
          <span class="row-title">{item.title}</span>
        </label>
      {/each}
    </div>
  {/if}
{/if}

<style>
  .info {
    margin: 12px 0 4px;
    text-align: center;
    font-size: 13px;
    color: var(--hint);
  }

  .list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .list-header {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--hint);
  }

  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 8px;
    border-radius: 10px;
    cursor: pointer;
    border-bottom: 1px solid rgba(139, 149, 158, 0.15);
    border-bottom-color: color-mix(in srgb, var(--hint) 15%, transparent);
  }

  .row:active {
    background: var(--bg-secondary);
  }

  .row input[type='checkbox'] {
    width: 20px;
    height: 20px;
    margin: 0;
    flex-shrink: 0;
    accent-color: var(--button);
  }

  .row-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
