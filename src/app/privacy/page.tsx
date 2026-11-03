import type { Metadata } from 'next';
import { DemoNotice, PageHeader } from '@/components/layout/PageHeader';
import prose from '@/components/layout/prose.module.css';

export const metadata: Metadata = { title: 'Privacy (draft)' };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Draft placeholder" title="Privacy.">
        <p>The approved privacy policy will be published before launch. This page describes only what this demo does.</p>
      </PageHeader>
      <div className={`container ${prose.prose}`}>
        <DemoNotice>Draft placeholder — not a reviewed legal policy and not legal advice.</DemoNotice>
        <h2>What this demo does with information</h2>
        <ul>
          <li>The introduction form checks your entries in your browser. It does not send, store or email them.</li>
          <li>The seller wizard keeps your draft in this browser tab only. It is cleared when you reload or close the tab. Export happens only if you choose it.</li>
          <li>Saved opportunities are stored as sample listing IDs in this browser’s local storage, on this device only.</li>
          <li>A session flag remembers that you have seen the intro, so it does not repeat.</li>
          <li>No analytics, advertising or tracking services are connected.</li>
        </ul>
        <h2>Before launch</h2>
        <p className={prose.muted}>
          The operator’s identity, what is collected, why, where it is stored, retention periods, who it is shared with and your rights will be set out in an
          approved policy. Do not enter confidential business information into this demo.
        </p>
      </div>
    </>
  );
}
