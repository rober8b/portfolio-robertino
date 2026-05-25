export function GithubSetupNeeded() {
  return (
    <div className="glass rounded-lg p-8 text-sm leading-relaxed text-[var(--ink-soft)]">
      <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase opacity-60">
        GitHub Activity — setup pendiente
      </p>
      <p className="mt-4 text-[var(--ink)]">
        Falta el Personal Access Token de GitHub para conectar la sección live.
      </p>
      <ol className="mt-4 list-decimal space-y-1.5 pl-5">
        <li>
          Crear un token fine-grained en{" "}
          <a
            href="https://github.com/settings/tokens?type=beta"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[var(--accent)] underline-offset-2 hover:underline"
          >
            github.com/settings/tokens
          </a>{" "}
          (read-only, public repos + read:user)
        </li>
        <li>
          Copiar <code className="rounded border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] px-1 py-0.5 font-mono text-xs">.env.example</code>{" "}
          a <code className="rounded border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] px-1 py-0.5 font-mono text-xs">.env.local</code> y pegar el token
        </li>
        <li>
          Reiniciar el dev server (<code className="rounded border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] px-1 py-0.5 font-mono text-xs">pnpm dev</code>)
        </li>
      </ol>
    </div>
  );
}
