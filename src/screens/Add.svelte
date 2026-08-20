<script lang="ts">
  import { t } from '../lib/i18n';
  import { go, goHome } from '../lib/nav.svelte';
  import PasswordField from '../components/PasswordField.svelte';

  let title = $state('');
  let password = $state('');
  let touched = $state(false);

  const titleInvalid = $derived(title.trim().length === 0 || title.length > 40);
  const passwordInvalid = $derived(password.length < 4 || password.length > 100);

  function submit(event: SubmitEvent) {
    event.preventDefault();
    touched = true;
    if (titleInvalid || passwordInvalid) {
      return;
    }
    go({
      name: 'verify',
      mode: 'encrypt',
      forEncrypt: [{ title: title.trim(), password }],
    });
  }
</script>

<form class="panel" onsubmit={submit}>
  <div class="field-wrap">
    <span class="field-label">{t('ENTER_TITLE')}</span>
    <input class="field" bind:value={title} maxlength="40" autocomplete="off" />
    <span class="field-error">{touched && titleInvalid ? t('TITLE_VALIDATION') : ''}</span>
  </div>

  <PasswordField bind:value={password} label={t('ENTER_PASSWORD')}
    error={touched && passwordInvalid ? t('PASSWORD_VALIDATION') : ''} />

  <section class="actions">
    <button type="submit" class="btn">{t('ADD')}</button>
    <button type="button" class="btn btn-stroked" onclick={goHome}>{t('BACK')}</button>
  </section>
</form>
