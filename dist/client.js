const copyButton = document.querySelector('[data-copy-email]');
copyButton?.addEventListener('click', async () => {
  const status = document.querySelector('[data-copy-status]');
  try {
    await navigator.clipboard.writeText('sourav.chandhok@gmail.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Copy unavailable. Select the email address above, or use the email link.';
  }
});
