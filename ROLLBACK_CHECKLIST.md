# PhysioPro Live Website Release 1.7 Rollback Checklist

Use only if an approved Release 1 deployment causes production problems.

Canonical deployment method: GitHub -> Cloudflare Pages. Rollback should use Cloudflare's previous production deployment first. Do not use direct `wrangler pages deploy` as a rollback shortcut unless a new approved emergency plan explicitly supersedes this checklist.

## 1. Rollback Triggers

Rollback immediately if any of these occur:

- Homepage is blank, broken, or shows the local Fable/cinematic homepage.
- CSS or JS fails site-wide.
- High-intent pages return 404/500 unexpectedly.
- `/api/config`, `/api/lead`, `/api/ask`, or `/api/assistant` fail unexpectedly.
- Lead form or Ask Leonardo becomes unusable.
- Protected internal files are still publicly exposed after deployment.
- Cloudflare Pages serves repository root instead of Git-built `dist`.
- Console shows blocking JavaScript errors on homepage/contact/first-session/Ask Leonardo.
- Mobile navigation is unusable.

## 2. Preferred Rollback: Cloudflare Pages Previous Deployment

1. Open Cloudflare dashboard.
2. Go to Workers & Pages.
3. Select the PhysioPro Pages project.
4. Open Deployments.
5. Identify the last known-good production deployment before Release 1.
6. Use Cloudflare's rollback/redeploy previous deployment action.
7. Wait for deployment status to become successful.
8. Re-test the production URL:

```bash
curl -I https://physioprotijuana.com/
curl -I https://physioprotijuana.com/first-session
curl -I https://physioprotijuana.com/api/config
```

9. Confirm homepage, first-session, contact, Ask Leonardo, and one condition page render.
10. Record rollback timestamp, deployment ID, reason, and validation result in the canonical plan.

## 3. Secondary Rollback: Revert Release 1 Package Changes

Use this only if Cloudflare previous-deployment rollback is unavailable.

1. Stop further deployments.
2. Revert the Release 1 website repo changes in a controlled branch.
3. Restore previous GitHub source/build-output behavior only if Leonardo approves that risk.
4. Run local validation:

```bash
npm run build
git diff --check
```

5. Deploy only after Leonardo approves the rollback package.
6. Validate production as in the post-deploy checklist.

## 4. What Not To Do During Rollback

- Do not deploy the repository root as a quick fix.
- Do not use direct Wrangler upload as a quick fix.
- Do not deploy the local Fable homepage.
- Do not change Cloudflare secrets.
- Do not rotate credentials unless a separate security incident requires it.
- Do not change Google Search Console, GBP, or GA4 during rollback.
- Do not run live Turnstile/Queue tests unless Leonardo approves.
- Do not begin Release 2 while recovering Release 1.

## 5. Minimum Post-Rollback Validation

After rollback, confirm:

- `https://physioprotijuana.com/` returns 200.
- Homepage is the expected production homepage.
- `/first-session`, `/contact`, `/ask-leonardo`, `/knee-pain`, `/resources` return 200.
- `/api/config` returns JSON with `ok: true`.
- `.html` legacy page such as `/first-session.html` redirects.
- A random unknown URL does not create a worse production failure than the pre-release baseline.
- Internal docs/config are not more exposed than before rollback.

## 6. Rollback Report Fields

Record:

- Rollback date/time.
- Person performing rollback.
- Cloudflare project.
- Rolled-back deployment ID.
- Failed deployment ID.
- Triggering issue.
- Commands/checks run.
- Final production status.
- Whether Release 1 should be fixed and retried.
