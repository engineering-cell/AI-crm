# Group Classes — one source for calendar, AI agent and website

Living log of the group-classes work: what was built, why, and what's left.
Covers **both repos** — `AI-crm` (frontend) and `DanceStudio-CRM-Backend` (backend).

| | |
|---|---|
| Last updated | 2026-11-02 |
| Frontend branch | `feat/group-class-source-fe` |
| Backend branch | `feat/group-class-source-be` |
| Status | Phases 1–6, 4b and 8 built · Phase 7 (backfill) is last, before deploy · Phase 8 needs the setup in §3 |

---

## 1. Goal

A studio describes a group class once, schedules it once, and the **calendar**, the
**AI agent** (SMS/email + voice) and the **website** all read the same records — no
copy of class times anywhere else that can drift.

### Data model

```
Lesson (class type)  ──►  ClassSchedule (weekly rule)  ──►  CalendarEvent (dated session)
"what is it"              "when does it repeat"            "what happens on this date"
```

| Record | Holds | Notes |
|---|---|---|
| **Lesson** (existing model, reused as the class type) | name, description, tags (level/category), duration, colour, billing service, `isActive` | "Active" is separate from "scheduled": an active class with no schedule is an offering with no upcoming times. |
| **ClassSchedule** (new) | class, location, instructor, room, weekdays, start time, duration, capacity, start/end date, Draft/Published | Times are studio wall-clock; dates are studio-local `YYYY-MM-DD`. `endDate: null` = ongoing. |
| **CalendarEvent** (existing, `type: "lesson"`) | date/time, roster, status, capacity, room, `scheduleDate`, `isOverride` | The session is the source of truth for its own date. Linked to its schedule by `recurrenceGroupID = ClassSchedule._id`. |

### Rules that keep everything aligned
- **Drafts** still put sessions on the staff calendar; only **published** schedules of **active** classes reach the AI agent and website.
- **One-off edits** (time, teacher, room, capacity on one session) mark it `isOverride`; later schedule edits leave it alone.
- **"From this date forward" edits** change future sessions only, skip cancelled/overridden ones, and are **refused (409) rather than dropping a booked student**.
- **Sessions remember their original slot** (`scheduleDate`), so a moved session is still matched to its date, and ending a schedule removes its overrides too.
- **Class details** (name, description) are read live from the class, so an edit shows up everywhere at once; a rename also updates upcoming session titles.
- **Everything is in studio time**, never the viewer's or the server's timezone.

---

## 2. Progress

| Phase | What | Status |
|---|---|---|
| 1 | Data model + session generation + daily top-up job | ✅ Done — backend `bc10bfb` |
| 2 | Edit scopes: this session / from this date forward / end | ✅ Done — backend `bc10bfb` |
| 3 | Shared read `listClassSessions()` | ✅ Done — backend `bc10bfb` |
| 6 | Frontend: Group classes page, drawer, calendar integration | ✅ Done — frontend `0437996` |
| 4 | AI agent `getGroupClasses` tool (text + voice) | ✅ Done — backend `1f9b8fd` + `ca09af3` |
| 4b | AI agent sells a drop-in by payment link; the lead joins the class once they pay | ✅ Done — backend `af7e58e` |
| 7 | Backfill existing series + retire old classes | ⏳ Next — **needed before deploy** (see §6) |
| 5 | Website plugin (`/public/classes` + `embed.js` + "Website embed" button) | ✅ Done — backend `bda428e`, frontend `508aaee` |
| 8 | Website booking widget: book and pay from the studio's own site | ✅ Built, not committed — branches `feat/embed-be` / `feat/embed-fe` |
| — | Vapi webhook authentication (pre-existing gap) | ⚠️ Needs a decision (see §6) |

---

## 3. What was built, and why

### Backend (`DanceStudio-CRM-Backend`)

**Models**
- `src/models/lesson.model.js` — added `description`, `tags`, `isActive`. The class type is what the agent and website describe; "active" is its own switch.
- `src/models/classSchedule.model.js` *(new)* — the weekly rule. There was no schedule record before, only copies of the rule on each event, so there was nowhere to keep capacity, publish status or an "ongoing" end.
- `src/models/calendarEvent.model.js` — added `capacity`, `room`, `scheduleDate`, `isOverride` so each session stands on its own for its date.

**Core logic — `src/services/classSchedule.service.js`** *(new)*
- `scheduleSlots()` — weekly rule → dated slots in studio time (DST-safe).
- `extendSchedule()` / `extendAllSchedules()` — keep sessions generated 90 days ahead; idempotent.
- `planForwardEdit()` / `applyForwardEdit()` / `endSchedule()` — "from this date forward" edits and ending a schedule, with booked-student conflicts labelled in studio time.
- `changesSessionPattern()` — detects a real one-off change (the edit form re-sends every field, so it compares values).
- `listClassSessions()` / `sessionRow()` — **the single shared read** for the staff week view, AI agent and website. Never returns roster or customer data.
- `describeGroupClasses()` / `formatGroupClassesAnswer()` — the AI agent's answer (Phase 4).
- `src/services/calendarRecurrence.service.js` — exported the existing `addCalendarDays` helper to reuse its timezone-safe date maths.

**API, job and wiring**
- `src/controllers/classSchedule/classSchedule.controller.js` + `src/routes/classSchedule/classSchedule.routes.js` *(new)* — endpoints below; mounted in `src/routes/index.js`.
- `src/schedulers/classSchedule.scheduler.js` *(new)* + `src/app.js` — daily 02:15 job that tops schedules up to the horizon (behind `ENABLE_SCHEDULERS`).
- `src/helper/activityGap.registry.js` — schedule create / update / end appear in the Activity Log.

**Changes to existing controllers**
- `src/controllers/lesson/lesson.controller.js` — new class fields; renames update upcoming session titles; a class with a running schedule can't be deleted (409).
- `src/controllers/calendarEvent/calendarEvent.controller.js` — capacity and room editable per session; one-off changes to a series session set `isOverride`.

**AI agent (Phase 4)**
- `src/services/textAgent/textAgentTools.service.js` — `getGroupClasses` tool for the SMS/email agent (schedule service loaded lazily; importing agenda statically hangs the unit tests).
- `src/services/textAgent/textAgentGraph.service.js` — prompt rule: the tool overrides any class times in the knowledge base; agent version bumped so cached agents rebuild.
- `src/services/vapi.service.js` — voice tool + "Group classes" prompt section; **four copy-pasted tool lists replaced by one `buildManagedTools()`** so no call path can miss a tool.
- `src/controllers/vapiWebhook/vapiWebhook.controller.js` — voice tool handler; same `describeGroupClasses()` as SMS, so both agents answer identically.

**AI agent sells a drop-in (Phase 4b)**

How it works: the agent describes the class → quotes the drop-in price → the lead agrees → the agent sends a payment link for that one session (SMS asks the lead to confirm first, like intro lessons) → one spot is held for 2 hours → the lead pays → they become a customer and join the session's roster → the usual confirmation goes out.

- `src/services/classSchedule.service.js` — `getGroupClasses`' answer now shows each class's **drop-in price** (the price on its billing service) and a `sessionID` for every bookable session. `checkGroupClassBookable()` re-checks a session the model picked: published, active class, scheduled, in the future, at the lead's studio, has a price, not full. Held spots count toward "spots left" everywhere.
- `src/services/textAgent/textAgentTools.service.js` + `textAgentGraph.service.js` — `sendGroupClassPaymentLink` tool for SMS/email: propose → confirm, **price always from the class, never from the model**. Added to the mutating-tool lists (`emptyReplyRetry.service.js`, `pendingAgentAction.model.js`).
- `src/services/vapi.service.js` + `vapiWebhook.controller.js` — the same tool for calls (after the caller agrees; deduped per tool call). The existing "who is this caller" logic was extracted into `resolvePayingLeadForCall()` and is shared by both payment tools.
- `src/services/vapiLeadPayment.service.js` — the existing link creator takes an optional `classSessionID`: same link, SMS/email, 24h expiry and duplicate protection as intro links, but it **holds a spot on the shared session** (`CalendarEvent.heldSpots`) instead of creating a private held event.
- `src/models/paymentRequest.model.js` — new kind `lead_group_class` + `classSessionID`. `pay.controller.js` and `paymentTarget.service.js` accept it like `lead_intro`.
- `src/services/paymentSettlement.service.js` — `joinGroupClassFromPayment()`: after the existing lead → customer conversion, adds the customer to the roster with a direct-payment record, releases their hold, links the Payment to the session for reports, schedules the class reminder and sends the confirmation. Every payment channel (Clover checkout, Clover terminal, Stripe, staff desk) settles through this one function.

**For a studio to sell a class this way:** the class needs a billing service with a price, and the studio needs Clover or Stripe connected (same as intro lessons). A class with no price is described as "can't be paid online — team follow-up".

**Website plugin (Phase 5)**
- `src/routes/publicClasses.routes.js` *(new)*, mounted at `/public/classes` in `src/app.js` — modelled on the forms embed: GET-only, CORS open to any origin, rate-limited per IP.
  - `GET /public/classes/:locationID/sessions?days&tag` — the same `listClassSessions()` rows as the staff week view and the AI agent: published schedules of active classes only, cancellations flagged, spots left (including held spots). Returned through a **whitelist** (`toPublicSession`): class name, description, tags, studio-local date/day/time, instructor first name, room, spots left, cancelled. **No ids, rosters, capacity or prices.** Unknown or malformed location → 404.
  - `GET /public/classes/embed.js` — `CadanceClasses.create({ locationId, target, tag?, days?, cssClass? })`. Renders with `textContent` only (no HTML injection from class text), under `.cadance-classes` / `.cadance-classes__item` so the studio's CSS can restyle it. Category/level filters come from class **tags** — there is no website-only schedule.
- Frontend: `app/calendar/group-classes/components/WebsiteEmbedDialog.js` + a **Website embed** button on the Group classes page — pick a location (and optional tag), copy the snippet.

**Website booking widget (Phase 8)**

A studio pastes two lines on its site. Visitors see the schedule, verify their mobile number, then use a credit or pay. Flow: `class-booking-prototype.html`; rules: `Online-Class-Booking_Flow_v3.docx`. Where they differ, the steps follow the prototype and the rules follow the doc, because the doc is newer.

```html
<div data-cadance-booking data-location="LOCATION_ID"></div>
<script src="https://API/public/booking/widget.js" async></script>
```

`data-location` takes several ids (`a,b`) and shows a location menu. Also `data-tag`, `data-days`, `data-accent`, `data-bg`, `data-text`, `data-font`, `data-heading-font`, `data-theme="dark"`, `data-title`. The schedule is a compact section: weekday tabs, date arrows for later weeks (4 weeks by default; `data-days` changes it), one row per class with View Details and Book. Shades (borders, muted text) are mixed from the text and background, and button text picks black or white to suit the button. `data-font` takes a listed Google font, which is then loaded from Google, or any font the site already has. Sites that strip scripts use the iframe or direct link to `/public/booking/page/:locationID`. The older read-only `/public/classes/embed.js` still works for anyone who pasted it.

Steps: schedule → phone → code → who's attending (households only) or first name + email (new) → confirm with credits, or choose a package → pay → booked. A full class goes to the waitlist; a returning device skips phone and code.

- `src/embeds/classBookingWidget.js` — the widget. Shadow DOM, so a site's CSS can't break it.
- `src/routes/publicBooking.routes.js` — `/public/booking`. Its CORS is mounted **before** the restricted global cors in `app.js`, which would otherwise end the JSON preflight.
- `src/services/bookingOtp.service.js` — Twilio Verify, limits (3 codes / 15 min per number, 10 / hour per IP, 5 misses lock 30 min), and the 180-day device token, per location, signed with a key derived from `JWT_SECRET` so it can never pass staff auth. Buying needs a code from the last 30 minutes.
- `src/services/classBooking.service.js` — seats, credits, holds, checkout, settlement.
  - **Last seat:** the capacity check is inside the update's own filter (`seatsAvailableClause`), so a race has one winner. Uses the native driver, as Mongoose's `$expr` casting rejects those operators.
  - **Credits:** service-scoped; memberships first, then the package expiring soonest. Charge records match `refundCharges()`. Deliberately not `checkAndChargeService`, which checks and decrements separately.
  - **Payment:** the location's hosted Stripe or Clover checkout in a new tab; the widget polls. One checkout per hold, so a double tap can't open two payable sessions. A pack's enrollment is created only once paid, so an abandoned checkout leaves nothing that can fund a booking.
  - **New people:** a provisional Customer, **no Lead** — a new Lead starts the follow-up chain, and they only agreed to a one-time code.
- `src/services/classWaitlist.service.js` + `src/schedulers/classWaitlist.scheduler.js` — a 2-minute sweep offers each freed seat to #1 by SMS with a 2-hour hold, then rolls on. Freed seats stay closed to the public while anyone waits.
- `src/models/classBooking.model.js`, `classWaitlistEntry.model.js`, `bookingOtpGuard.model.js` *(new)*; `calendarEvent.heldSpots.waitlistEntryID`; `paymentRequest.classBookingID`, channel and soldVia `"web"`; `paymentSettlement.service.js` calls `fulfilPaidBooking`.
- **Test page:** `/booking-test?location=ID` in the CRM (linked from the dialog), a pretend studio site with the live widget. Public route, on a different origin from the API like a real site. Unlike the preview, bookings there are real.
- **Preview in the dialog:** the real widget with `data-preview` in a sandboxed frame (`allow-scripts allow-forms`, never `allow-same-origin`). It stops at the phone step, so no texts go out and no seats are held. It needs the backend running this widget version, as an older one would ignore the flag.
- Frontend: `WebsiteEmbedDialog.js` rebuilt (locations, tag, colour, theme; code / iframe / link; live desktop/mobile preview), and the **Website embed** button is back on the Group classes page.

**Setup before it can go live**
1. Create a Twilio Verify service and set `TWILIO_VERIFY_SERVICE_SID`. Without it the phone step answers 503.
2. Set `PUBLIC_API_BASE_URL`, or waitlist offers can't include a link and are skipped.
3. Each class needs a billing service with a code and price; packs must contain only that service to be listed.

**Run its tests:** `BOOKING_TEST_MONGO_URI=mongodb://127.0.0.1:27017 node --test --test-force-exit src/services/classBooking.integration.test.js` (skipped without that variable; replaces Twilio and the database before app code loads).

### API — `/api/class-schedule` (permission: calendar › lessons)

| Method & path | Does |
|---|---|
| `POST /` | Create a schedule for a class and generate its sessions |
| `GET /` | List schedules (populated class/teacher/location + `nextSessionAt`) |
| `GET /sessions?start&days` | Session rows for the staff week view (drafts included) |
| `GET /:id` | One schedule (used by the calendar event panel) |
| `PATCH /:id` | Edit from `effectiveFrom` (YYYY-MM-DD) forward; 409 + `conflicts[]` if booked sessions are in the way |
| `DELETE /:id?from=` | End the schedule from a date; past sessions stay |

### Frontend (`AI-crm`)

**New**
- `app/calendar/group-classes/page.js` — Group classes page (Calendar › Group Classes): metrics, **Class library** (weekly days, time, dates, Live/Draft, next session in studio time, description toggle, search incl. tags, filter) and **Weekly schedule** (built from the same session rows the agent reads).
- `app/calendar/group-classes/components/GroupClassDrawer.js` — one form for class details + recurring schedule. Modes: new class · edit class / add schedule · edit schedule ("Apply changes from", "End schedule"). A failed schedule save can be retried without duplicating the class.

**Changed**
- `app/calendar/components/EventDetailPanel.js` — for schedule sessions, "All in series" is hidden (it would rewrite past sessions) and replaced by "Change or end the schedule from this date"; group classes show their class name as the heading (was "Lesson lesson").
- `app/calendar/components/AppointmentComposerPanel.js` — Group Class tab links to Group Classes instead of offering Repeat; a stale Repeat flag from another tab can't create a hidden series.
- `components/layout/Sidebar.js` — Calendar › Group Classes sub-item; only the most specific item highlights (also fixes Reports).
- `lib/constants.js` — route permission for the new page.
- `app/settings/setup/page.js` — Lessons tab uses the new drawer; "Active" read from `isActive`.

**Deleted**
- `app/calendar/lessons/page.js` (orphaned page, nothing linked to it) and `app/calendar/lessons/components/LessonDialog.js` (replaced by the drawer).

---

## 4. Testing

| What | Result |
|---|---|
| Unit tests (`classSchedule.service.test.js`, `vapi.service.test.js`) | ✅ 12 new tests pass — DST, date bounds, forward edits, moved sessions, overrides, no roster leak, refused edits write nothing, agent answer wording, tool list merge |
| Backend end-to-end over HTTP (test org) | ✅ 30/30 checks |
| UI end-to-end in headless Chrome (test org) | ✅ 51 checks — library, create, weekly view, forward edit, calendar panel → drawer, composer link, sidebar, refusals, end schedule |
| AI agent on real data | ✅ text tool + simulated Vapi tool call give the same answer; drafts and inactive classes hidden |
| AI agent, live LLM conversation (SMS agent, `gpt-5.6-terra`) | ✅ 6/6 — calls the tool for every class question, quotes the live Tue/Thu 7:30 PM times, nothing from an ended schedule, "offered but not scheduled" for an unscheduled class, a definite "not offered" for a style the studio doesn't teach |
| Drop-in sale, live LLM end to end (Phase 4b) | ✅ 14/14 — lead asks → agent quotes $25 + date → proposes → lead confirms → real `/pay/` link, spot held (spots 14 → 13) → lead to Pending Payment → payment settled through the real settlement function → lead converted, on the roster, $25 recorded, hold released, payment linked to the session |
| Drop-in sale by voice (simulated Vapi webhook) | ✅ 5/5 — price + sessionID listed, a made-up sessionID refused, real one creates a $25 link and holds the spot, agent told not to read the URL/ID aloud |
| Website embed (Phase 5) | ✅ 9/9 API + browser — public payload has no ids/rosters/prices; tag filter; 404s; CORS `*`; the embed renders on a different origin (class, time, instructor, spots left, friendly day headings); unscheduled/inactive classes hidden; empty state. Plus 4/4 UI — the dialog's generated snippet, pasted as-is onto another site, renders the schedule |
| Unit tests for drop-ins | ✅ 7 new (bookability rules, holds vs capacity, price/sessionID in the answer, SMS propose/confirm, server-side price); no regressions across 268 payment/agent tests |
| Voice agent with a real phone call | ⏳ Not run — needs Vapi + a phone number; the voice path is covered by the simulated webhook call above |

**Bugs found by testing and fixed**
1. Ending a schedule left one-off-edited sessions behind → sessions now carry `scheduleDate`.
2. "Next session" showed in the viewer's timezone (Tue 7:30 PM New York read "Wed 5:00 AM" from India).
3. The booked-session refusal named the wrong day for the same reason → labelled in studio time by the backend.
4. Weekly view could clip classes at week edges for viewers in another timezone.
5. Event panel heading read "Lesson lesson" for every group class *(pre-existing)*.
6. Drawer "Color" label sat beside its swatch.
7. Live LLM test: asked "do you have a hip hop class?", the agent answered from memory ("I don't have details handy") instead of checking. The tool and prompt wording now also cover "is a class or style offered at all".

> Locally, knowledge-base search logs "Context Retrieval failed" — it needs Atlas vector search, which a local MongoDB doesn't have. Expected; unrelated to this feature.

**Pre-existing failures, unrelated to this work:** 4 backend tests in `calendarEvent.controller.test.js` / `calendarEvent.unallocated.test.js`, 1 in the text-agent suite (stub missing `peekPendingBookingPreference`), and 2 flaky frontend tests (reports, inbox).

---

## 5. Run it locally against the test org

A test org ("dev studio") is seeded in the local MongoDB, database **`crm_dev_group_classes`**,
by `src/scripts/seedDevOrg.js` (it prints the login and refuses to touch `DanceStudioCRM`).

```bash
# Backend — local DB, schedulers off, outbound integrations given dummy keys
cd DanceStudio-CRM-Backend
PORT=8090 MONGO_URI=mongodb://127.0.0.1:27017 MAIN_DB_NAME=crm_dev_group_classes \
ASSISTANT_DB_NAME=crm_dev_group_classes_assistant ENABLE_SCHEDULERS=false \
CORS_ORIGINS=http://localhost:3100 FRONTEND_URL=http://localhost:3100 \
VAPI_API_KEY= PUBLIC_API_BASE_URL= SENDGRID_API_KEY=SG.dummy STRIPE_SECRET_KEY=sk_test_dummy \
TWILIO_ACCOUNT_SID=AC00000000000000000000000000000000 TWILIO_AUTH_TOKEN=dummy \
node server.js

# Frontend
cd AI-crm
NEXT_PUBLIC_API_BASE_URL=http://localhost:8090 npx next dev -p 3100
```

Open http://localhost:3100 → Calendar › Group Classes.

> ⚠️ The backend `.env` points at the production Atlas cluster. Always override
> `MONGO_URI` / `MAIN_DB_NAME` for local testing — dotenv won't overwrite variables
> that are already set.

> ⚠️ On 2026-10-19 a Turbopack dev server leaked ~1,300 PostCSS worker processes,
> exhausted memory and crashed the MongoDB service. It didn't recur, but if the
> machine slows down during `next dev`, check the `node.exe` count.

---

## 6. Open items and decisions

**Before deploy**
- **Retire old classes (Phase 7).** Existing classes default to active, so the AI agent would describe retired programs as "offered". Backfill: `isActive: false` where the old `endDate` has passed (the rule the old "Active" column used).
- **Bring existing recurring series in (Phase 7).** Create a **Draft** schedule for each existing group-class series (`_id = recurrenceGroupID`, so sessions link without being rewritten); staff review and publish.

**Security (pre-existing)**
- `/api/vapi-webhook` has **no authentication** and trusts `organisationID` from the request body, so tool calls (including payment links and lesson cancellations) can be forged. Fix: a shared server secret set in Vapi and checked in the handler — needs coordinated rollout.

**Other findings**
- `scripts/patch-phone-input.js` looks for a pnpm path, so it never runs under npm; `next dev --webpack` then fails on a CSS selector in `react-phone-input-pro` (Turbopack tolerates it).
- Settings › Setup "Lessons" tab is unreachable (removed from the tab list in `a664037`) — dead code.

**Defaults chosen (change if wrong)**
- A class can have several schedules (e.g. Mon/Wed 6 PM and Sat 11 AM).
- Room is free text (no rooms model exists).
- Capacity counts attending customers plus attending family members.
- Sessions are generated 90 days ahead.
- Drop-ins: the price is the class's billing-service price; a spot is held for 2 hours (same as intro lessons); the link stays valid 24 hours.

**Known limits of drop-in sales (deliberate, revisit if they bite)**
- Two leads racing for the very last spot can both get a link; if both pay, the session is overbooked by one rather than refusing a paid customer.
- If a session is cancelled (or fills) after the lead was sent a link and they still pay, they're added anyway and the problem is only logged for staff — no automatic refund or rebooking.
- A lead who already has a group package still pays the drop-in price; using a package session instead isn't built.
- On calls, an existing customer gets "a team member will follow up" instead of a link.

**Open decisions on the booking widget (Phase 8)**
- **Cancelling by text:** the doc has Kira remove the student, return the credit and offer the seat on. The widget shows that promise, but Kira's side isn't built here. A staff roster edit does free the seat for the waitlist; check how credits come back, and a paid single class has no credit to return yet (`refundCharges` is a no-op on `direct`).
- **Inline card form:** the prototype and doc show one on the page. Clover studios have only the hosted page, so all studios use hosted checkout for now.
- **Abandoned-checkout text:** not sent. The prototype requires opt-in at the phone step, which needs agreed consent wording first.
- **Reminder timing:** the existing 24-hour reminder is unchanged. The doc asks for 2 hours with new wording, which would change it for every class.
- **Waiver tick-box:** not added; there's no waiver text to show. The existing first-visit waiver job still runs.
- **Staff can't see the waitlist in the CRM yet** (data is in `classwaitlistentries`), and accepting an offer is by link, not by replying to the text.

**Not built yet (add when needed)**
- Spots left on calendar cards.
- Enrolling a student in all following sessions of a schedule.
- Selling a full package or several sessions at once through the agent.

---

## 7. Changelog

- **2026-10-19** — Phases 1–3 (backend `bc10bfb`), Phase 6 (frontend `0437996`), Phase 4 (backend `1f9b8fd`). End-to-end tested against the local test org; six bugs found and fixed (§4). This document started.
- **2026-10-19** — Live LLM conversation with the SMS agent: 6/6 after broadening the tool wording so "do you have X class?" checks the schedule (backend `ca09af3`, bug 7 in §4).
- **2026-10-22** — Found by hand-testing in Postman (backend `c6efa81`): a lead who texted "done!" without paying was told "you're all set". The agent had no payment signal; the prompt now says each turn whether the lead's group class link is unpaid (never confirm) or paid (they are enrolled). Verified unpaid → "I don't see the payment", paid → "you're enrolled".
- **2026-10-22** — Phase 5: public class schedule endpoint, `embed.js` and a Website embed dialog for staff.
- **2026-10-21** — Phase 4b (backend `af7e58e`): the agent sells a group class drop-in by payment link and seats the lead on the roster once they pay. Live LLM conversation → link → payment → roster: 14/14; voice via simulated webhook: 5/5; no regressions across 268 payment/agent tests.
- **2026-11-02** — Phase 8: website booking widget, seat holds, group credit spending, waitlist with SMS offers, rebuilt embed dialog.
- **2026-10-29** — Editing gaps closed: a schedule's **start date** is now editable (applied "from this date forward"; empty sessions before the new start are removed, booked ones block with a 409). Editing a class's **colour** or **billing service** now updates its upcoming scheduled sessions on the calendar (previously only a rename did). Schedule **location** is still fixed after creation — end the schedule and create a new one.
