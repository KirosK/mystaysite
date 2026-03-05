"use client";

import { useState } from "react";

const SITE_URL = "https://mystaysite.com";

const snippets = {
  html: `<!-- Built by mystaysite -->
<div id="mystaysite-badge" style="text-align:center;padding:12px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:#9ca3af;border-top:1px solid rgba(255,255,255,0.08);">
  <a href="${SITE_URL}?ref=badge" target="_blank" rel="noopener" style="color:#9ca3af;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color 0.2s;" onmouseover="this.style.color='#60a5fa'" onmouseout="this.style.color='#9ca3af'">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7"><path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
    Built by <strong style="color:#60a5fa;">mystaysite</strong>
  </a>
</div>`,

  script: `<!-- Built by mystaysite - paste before </body> -->
<script>
(function(){
  var d=document,b=d.createElement('div');
  b.id='mystaysite-badge';
  b.style.cssText='text-align:center;padding:12px 0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:12px;color:#9ca3af;border-top:1px solid rgba(255,255,255,0.08);';
  b.innerHTML='<a href="${SITE_URL}?ref=badge" target="_blank" rel="noopener" style="color:#9ca3af;text-decoration:none;display:inline-flex;align-items:center;gap:6px;" onmouseover="this.style.color=\\'#60a5fa\\'" onmouseout="this.style.color=\\'#9ca3af\\'"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7"><path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>Built by <strong style="color:#60a5fa;">mystaysite</strong></a>';
  var f=d.querySelector('footer');
  if(f)f.appendChild(b);else d.body.appendChild(b);
})();
</script>`,

  react: `{/* Built by mystaysite */}
<div style={{ textAlign: 'center', padding: '12px 0', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif', fontSize: '12px', color: '#9ca3af', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
  <a href="${SITE_URL}?ref=badge" target="_blank" rel="noopener" style={{ color: '#9ca3af', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}><path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    Built by <strong style={{ color: '#60a5fa' }}>mystaysite</strong>
  </a>
</div>`,
};

type Tab = "html" | "script" | "react";

export default function BadgePage() {
  const [tab, setTab] = useState<Tab>("html");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(snippets[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="text-lg font-extrabold">my</span>
            <span className="text-lg font-extrabold text-primary">stay</span>
            <span className="text-lg font-extrabold">site</span>
          </div>
        </a>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <h1 className="text-3xl font-extrabold mb-2">Badge Embed Code</h1>
        <p className="text-gray-400 mb-8">
          Copy and paste into your client websites. The badge links back to mystaysite.
        </p>

        {/* Preview */}
        <div className="bg-[#1E293B] rounded-xl p-6 mb-8 border border-white/10">
          <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-semibold">Preview</p>
          <div style={{ textAlign: 'center', padding: '12px 0', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif', fontSize: '12px', color: '#9ca3af', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <a href={`${SITE_URL}?ref=badge`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors" style={{ textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}><path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              Built by <strong className="text-blue-400">mystaysite</strong>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4">
          {(["html", "script", "react"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === t
                  ? "bg-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {t === "html" ? "HTML" : t === "script" ? "Script Tag" : "React/Next.js"}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="relative bg-[#1E293B] rounded-xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <span className="text-xs text-gray-500">
              {tab === "html" ? "Paste inside your footer" : tab === "script" ? "Paste before </body>" : "Add to your Footer component"}
            </span>
            <button
              onClick={copy}
              className="text-xs font-semibold px-3 py-1.5 rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-gray-300 leading-relaxed">
            <code>{snippets[tab]}</code>
          </pre>
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold">How it works</h3>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li>- <strong>HTML</strong>: Copy-paste directly into any footer</li>
            <li>- <strong>Script Tag</strong>: Auto-injects the badge, works on any site (WordPress, Wix, etc.)</li>
            <li>- <strong>React</strong>: For Next.js / React projects</li>
            <li>- All versions link to <strong>mystaysite?ref=badge</strong> for tracking</li>
          </ul>
        </div>

        <div className="mt-6">
          <a href="/" className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
            ← Back to home
          </a>
        </div>
      </main>
    </div>
  );
}
