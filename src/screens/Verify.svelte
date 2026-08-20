<script lang="ts">
  import { api } from '../lib/api';
  import { decrypt, encrypt } from '../lib/crypto';
  import { t } from '../lib/i18n';
  import { go, goHome, showToast, type View } from '../lib/nav.svelte';
  import { hapticNotification } from '../lib/telegram';
  import type { PasswordItem } from '../lib/types';
  import PasswordField from '../components/PasswordField.svelte';

  let { view }: { view: Extract<View, { name: 'verify' }> } = $props();

  let key = $state('');
  let busy = $state(false);
  let touched = $state(false);

  const keyInvalid = $derived(key.length < 4);

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    touched = true;
    if (keyInvalid || busy) {
      return;
    }
    busy = true;
    if (view.mode === 'decrypt') {
      await decryptItems();
    } else {
      await encryptItems();
    }
    busy = false;
  }

  async function decryptItems() {
    if (view.mode !== 'decrypt') {
      return;
    }
    const items = await Promise.all(
      view.forDecrypt.map(async (item) => {
        const result = await decrypt(item.encryptedPassword ?? '', key);
        return {
          id: item.id,
          title: item.title,
          icon: item.icon,
          password: result.error ? undefined : result.value,
          error: result.error,
        };
      })
    );
    go({ name: 'result', items });
  }

  async function encryptItems() {
    if (view.mode !== 'encrypt') {
      return;
    }
    const encrypted = await Promise.all(
      view.forEncrypt.map(async (item) => {
        const result = await encrypt(item.password ?? '', key);
        return {
          id: item.id ?? '',
          title: item.title,
          icon: item.icon,
          encryptedPassword: result.value,
          error: result.error || undefined,
        } as PasswordItem;
      })
    );
    if (encrypted.some((item) => item.error)) {
      hapticNotification('error');
      showToast(t('SAVE_ERROR'));
      return;
    }
    const results = await Promise.all(encrypted.map((item) => api.add(item)));
    if (results.some((result) => result.error)) {
      hapticNotification('error');
      showToast(t('SAVE_ERROR'));
      return;
    }
    hapticNotification('success');
    goHome();
  }
</script>

<form class="panel" onsubmit={submit}>
  <PasswordField
    bind:value={key}
    label={t('ENTER_MASTER_KEY')}
    error={touched && keyInvalid ? t('MIN_LENGTH_4') : ''}
  />

  <section class="actions">
    <button type="submit" class="btn" disabled={busy}>{t('VERIFY')}</button>
    <button type="button" class="btn btn-stroked" onclick={goHome} disabled={busy}>
      {t('HOME')}
    </button>
  </section>
</form>
