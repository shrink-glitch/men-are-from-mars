/* Mars & Venus, decoded - all content is paraphrased summary. */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (tag, attrs = {}, html = "") => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (html) n.innerHTML = html;
    return n;
  };

  /* Arrow-key support for any role="tablist" whose buttons are role="tab". */
  function keyTabs(list, onPick) {
    list.addEventListener("keydown", (e) => {
      const tabs = $$("[role=tab]", list);
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let j = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") j = 0;
      if (e.key === "End") j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); tabs[j].focus(); onPick(j); }
    });
  }
  function selectTab(tabs, idx) {
    tabs.forEach((t, i) => {
      t.setAttribute("aria-selected", String(i === idx));
      t.tabIndex = i === idx ? 0 : -1;
    });
  }

  /* ---------------- Two planets ---------------- */
  const THEMES = [
    { name: "What they value",
      mars: "Competence, efficiency and results. A Martian proves himself by achieving things, ideally on his own. Autonomy is a mark of strength, and asking for help when he could manage alone feels like weakness.",
      venus: "Love, communication and connection. A Venusian's sense of self comes from her feelings and the quality of her relationships. Offering help before being asked is a sign of care.",
      clash: "<strong>Where it clashes:</strong> unasked-for help is a gift on Venus and an insult on Mars. It tells him you doubt he can cope." },
    { name: "Under stress",
      mars: "Goes quiet and retreats to his cave to chew on one problem until he finds a solution. If he can't find one, he distracts himself with the news, a game or sport until his mind lets go.",
      venus: "Talks. She goes over everything that is bothering her, big and small, in no particular order. She isn't looking for solutions; the relief comes from being heard.",
      clash: "<strong>Where it clashes:</strong> he hears her talk as blame or a request for fixes, and she hears his silence as not caring." },
    { name: "What motivates",
      mars: "Feeling needed. When he is trusted to do his best and thanked for the effort, he has more to give. When he feels useless, he goes passive.",
      venus: "Feeling cherished. When she feels cared for and respected she has more to give. When she doesn't, she over-gives until she is exhausted and resentful.",
      clash: "<strong>Where it clashes:</strong> being needed energises him, but desperate, untrusting neediness drives him off. The difference is whether she trusts he'll come through." },
    { name: "Deepest fear",
      mars: "Not being good enough. To avoid failing he may stop trying, and when afraid he can look like he simply doesn't care.",
      venus: "Not deserving love. She compensates by giving, and finds receiving hard because it means risking disappointment.",
      clash: "<strong>The growth edge:</strong> he has to learn that it's fine to try and get it wrong; she has to learn she's worth receiving without earning it." },
    { name: "Intimacy rhythm",
      mars: "A rubber band. He gets close, then needs to pull away for a while, then springs back as warm as before, with no need to reconnect.",
      venus: "A wave. Her self-esteem rises and then crashes. At the bottom (the well) old feelings surface and she needs to be heard, not fixed, before she rises again.",
      clash: "<strong>Where it clashes:</strong> his pulling away can trigger her crash, and her crash arrives just when he can't listen. Gray says many fights start right here." },
    { name: "Six kinds of love",
      mars: "Trust, acceptance, appreciation, admiration, approval, encouragement.",
      venus: "Caring, understanding, respect, devotion, validation, reassurance.",
      clash: "<strong>Where it clashes:</strong> each gives the kind of love they would want. Both end up feeling they give more than they get. The needs come in pairs: give caring and she returns trust, give trust and he returns caring." },
    { name: "Saying sorry",
      mars: "\"I'm sorry\" means \"I did something wrong\", so he avoids it, especially after a big mistake he fears won't be forgiven.",
      venus: "\"I'm sorry\" means \"I care about how you feel\". It is not an admission of guilt.",
      clash: "<strong>The fix:</strong> \"I'm sorry you're so upset\" admits nothing and shows care. Gray calls it the quickest way to derail an argument." }
  ];

  (function compare() {
    const root = $("[data-component=compare]");
    const tabsBox = $(".tabs", root);
    const tabs = THEMES.map((t, i) => {
      const b = el("button", { class: "tab", role: "tab", type: "button", id: "theme-" + i }, t.name);
      b.addEventListener("click", () => pick(i));
      tabsBox.appendChild(b);
      return b;
    });
    function pick(i) {
      selectTab(tabs, i);
      $(".c-mars", root).textContent = THEMES[i].mars;
      $(".c-venus", root).textContent = THEMES[i].venus;
      $(".c-clash", root).innerHTML = THEMES[i].clash;
      $(".compare-panel", root).setAttribute("aria-labelledby", "theme-" + i);
    }
    keyTabs(tabsBox, pick);
    pick(0);
  })();

  /* ---------------- Big ideas ---------------- */
  const IDEAS = [
    { ch: "Ch. 2", title: "Mr. Fix-It and the Home-Improvement Committee",
      sum: "His classic mistake is solving; hers is improving.",
      claim: "When she talks about a problem he jumps in with solutions, which tells her that her feelings don't count. When he slips up she offers advice and corrections, which tells him he's being managed.",
      wrong: "On Mars, talking about a problem is a request for expert advice. On Venus, advice is an act of love and talking is how you get close. Gray stresses that both instincts are good; the timing is what's off.",
      tryit: "For one week: he listens whenever she talks, with no fixing. She gives no unsolicited advice or criticism. Both, Gray predicts, will be surprised." },
    { ch: "Ch. 3", title: "Men go to their caves, women talk",
      sum: "Two opposite ways of coping with stress.",
      claim: "Stressed men narrow down to one problem and go silent, leaving a fraction of their attention for anyone else. Stressed women widen out, feel every problem at once, and need to talk them through.",
      wrong: "She follows him into the cave with questions and gets 'burned by the dragon'. He resists listening because every problem she lists sounds like a charge against him.",
      tryit: "Her: don't chase, don't worry about him, do something you enjoy, and lean on friends. Him: remember that listening is the help. She can make it easier by giving the bottom line first and saying he doesn't need to solve anything." },
    { ch: "Ch. 4", title: "Needed versus cherished",
      sum: "What motivates each, and what each resists.",
      claim: "Men come alive when they feel needed, women when they feel cherished. His challenge is getting over a fear of giving and failing; hers is getting over a fear of receiving.",
      wrong: "She gives and gives, waits for him to notice, then blames him. He assumes all is well because she keeps giving, and coasts.",
      tryit: "Gray's three steps for a stuck couple: first she gets fully heard; then both take responsibility (he for not supporting, she for not setting limits); then both practise her saying no and him respecting it." },
    { ch: "Ch. 5", title: "Speaking different languages",
      sum: "Same words, different meanings.",
      claim: "Women use sweeping, poetic language to express feelings ('we never go out'). Men use clipped phrases that mean 'I'm handling it' ('it's nothing').",
      wrong: "He corrects the facts instead of hearing the feeling. She hears his short answers as shutting her out and keeps probing.",
      tryit: "Use the phrase translator below. When he goes silent, take it as 'still thinking', not 'don't care'. If you need to talk while he's in the cave, write it down or call a friend." },
    { ch: "Ch. 6", title: "Men are like rubber bands",
      sum: "Close, away, and back again.",
      claim: "Even a man deeply in love periodically pulls away to recover his sense of self, then springs back. It's an instinct, not a decision, and not her fault.",
      wrong: "Chasing him (following, worrying, guilt-tripping) stops him stretching far enough to miss her. Punishing his return teaches him not to come back. A man who never pulls away becomes moody and passive.",
      tryit: "Let him go and talk when he returns. He can help by saying 'I need some time, then I'll be back.' She can open conversations by asking him to listen rather than demanding that he talk." },
    { ch: "Ch. 7", title: "Women are like waves",
      sum: "Rising, crashing, and rising again.",
      claim: "A woman's self-esteem rises and falls in a cycle. At the bottom she does a kind of emotional housecleaning and needs extra love most.",
      wrong: "He tries to pull her up with reasons she shouldn't feel that way, or assumes the issue was settled last time and gets impatient when it returns. Good support can even make her feel worse before she feels better.",
      tryit: "Treat the well as a time to be with her, not a problem to solve. If you're in your cave and truly can't listen, say so kindly, acknowledge her hurt, and promise to come back." },
    { ch: "Ch. 8", title: "Twelve kinds of love",
      sum: "Six needs each, and they come in pairs.",
      claim: "She mainly needs caring, understanding, respect, devotion, validation and reassurance. He mainly needs trust, acceptance, appreciation, admiration, approval and encouragement. Meeting one side's need tends to unlock the matching need on the other.",
      wrong: "Gray's parable of the knight: each time the princess hands him a better weapon, he trusts his own sword less, until he rides off to a woman who knows nothing about nooses and poison.",
      tryit: "Him: listen without getting angry, and remember you don't have to agree to understand. Her: stop trying to improve him; he changes when he feels accepted as he is." },
    { ch: "Ch. 9", title: "How to avoid arguments",
      sum: "It's never what you said, it's how.",
      claim: "Couples start arguing about money or chores and end up arguing about the way they argue. The usual trigger is him dismissing her feelings and her answering with disapproval.",
      wrong: "Rhetorical questions ('How could you be so late?') carry disapproval. Logical explanations ('there was traffic') carry 'you have no right to be upset'. Then come the four F's: fight, flight, fake, fold.",
      tryit: "Spot the slide, take a time-out, and come back calmer. Her: state the feeling ('I don't like waiting'). Him: validate first and say 'I'm sorry I upset you.' See the fight anatomy tool below." },
    { ch: "Ch. 10", title: "Scoring points",
      sum: "Why the big gesture underperforms.",
      claim: "For her every act of love scores one point, whatever its size. He banks thirty points for a big gesture. His love tank fills mostly from her appreciation and warmth towards him.",
      wrong: "He works longer for her and thinks the score is even while she feels abandoned. Her 'resentment flu' zeroes his points; his 'penalty points' wipe out hers after one hurtful moment.",
      tryit: "Him: lots of small things, often. Gray lists 101. Her: notice and thank him, and ask instead of waiting. Both: no punishing." },
    { ch: "Ch. 11", title: "Communicating difficult feelings",
      sum: "When talking turns to fighting, write.",
      claim: "When charged, write a Love Letter before you speak: anger, then sadness, fear, regret and finally love, with a P.S. saying what you would like to hear. Writing drains the charge.",
      wrong: "Dwelling on one emotion only feeds it, and some feelings hide others (anger covering hurt, worry covering anger). Stopping halfway leaves you more upset.",
      tryit: "Use the Love Letter builder below. Gray also suggests a 'response letter' written from your partner, a monster letter you burn, and letters to a parent when old hurts surface." },
    { ch: "Ch. 12", title: "How to ask for support and get it",
      sum: "If you want to get, you have to ask.",
      claim: "Women expect support to be offered unasked, because that's how they show love. Men wait to be asked, and assume all is well if no one asks.",
      wrong: "By the time she asks, she's resentful and it comes out as a demand. Indirect hints and 'could you' phrasing make it worse.",
      tryit: "Three stages: ask (briefly, directly, with 'would you') for things he already does, and thank him; ask for more and accept 'no' graciously; then ask and stay quiet through his grumbling. Try the asking coach below." },
    { ch: "Ch. 13", title: "Keeping the magic of love alive",
      sum: "Love stirs up old hurts.",
      claim: "Feeling safe and loved is exactly when buried feelings surface, which is why couples fight after a lovely weekend. Most of a big upset, Gray says, comes from the past.",
      wrong: "Blaming the partner for the past, or telling them they're overreacting, which just presses on the bruise.",
      tryit: "When a reaction is out of proportion, ask what it reminds you of. Write the letter to whoever it really belongs to. Gray says even happy couples sometimes need a therapist for this." }
  ];

  (function ideas() {
    const list = $("[data-component=ideas]");
    IDEAS.forEach((d, i) => {
      const li = el("li", { class: "idea" });
      const btn = el("button", { class: "idea-btn", type: "button", "aria-expanded": "false", "aria-controls": "idea-" + i },
        `<span class="idea-ch">${d.ch}</span><span class="idea-title">${d.title}<span class="idea-sum">${d.sum}</span></span><span class="idea-sign" aria-hidden="true"></span>`);
      const body = el("div", { class: "idea-body", id: "idea-" + i, hidden: "" },
        `<div class="idea-cols">
           <div><h4>The claim</h4><p>${d.claim}</p></div>
           <div><h4>Where it goes wrong</h4><p>${d.wrong}</p></div>
           <div class="try"><h4>What to try</h4><p>${d.tryit}</p></div>
         </div>`);
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        body.hidden = open;
      });
      li.append(btn, body);
      list.appendChild(li);
    });
  })();

  /* ---------------- Tool tabs ---------------- */
  (function toolTabs() {
    const nav = $(".toolnav");
    const tabs = $$("[role=tab]", nav);
    function pick(i) {
      selectTab(tabs, i);
      tabs.forEach((t, k) => { $("#" + t.getAttribute("aria-controls")).hidden = k !== i; });
    }
    tabs.forEach((t, i) => t.addEventListener("click", () => pick(i)));
    keyTabs(nav, pick);
  })();

  /* ---------------- Translator ---------------- */
  const PHRASES = {
    venus: [
      { p: "We never go out.", heard: "You're boring, lazy and not doing your job.", means: "I'd love to go out with you. It's been a while.", helps: "Don't correct the word 'never'. Suggest a date." },
      { p: "Nobody listens to me anymore.", heard: "You're a terrible listener and you've let me down.", means: "I feel unimportant today and I'd like some of your attention.", helps: "Put the phone down, ask what happened, and keep the 'mm' and 'oh no' coming." },
      { p: "I'm so tired, I can't do anything.", heard: "I do everything around here and you do nothing.", means: "I've overdone it today and I need a rest and some reassurance.", helps: "A hug, a word that she's doing a lot, and maybe take one job off her list." },
      { p: "The house is always a mess.", heard: "This mess is your fault. Shape up.", means: "I want to relax and I can't. I hope you don't expect me to sort it all out.", helps: "Agree that it's a mess, then offer to take on part of it." },
      { p: "You don't love me anymore.", heard: "You've taken my best years and given nothing back.", means: "I'm feeling insecure today and I need to hear that you love me.", helps: "Say it. Skip the list of evidence." },
      { p: "We're always in a hurry.", heard: "You leave everything to the last minute and ruin things.", means: "I hate feeling rushed. It's nobody's fault.", helps: "Agree with the feeling: 'I don't like rushing either.'" }
    ],
    mars: [
      { p: "I'm OK.", heard: "I don't care, or I don't trust you with this.", means: "I can deal with this myself. No help needed, thanks.", helps: "Trust him to handle it, and don't follow up with questions." },
      { p: "I'm fine.", heard: "Even if this upsets you, it doesn't matter to me.", means: "I'm sorting it out. If I need help I'll ask.", helps: "Take it at face value for now. Check in later, lightly." },
      { p: "It's nothing.", heard: "I don't know what's wrong. Ask me more so I can find out.", means: "Nothing I can't handle alone. Please stop asking.", helps: "Drop it and do something you enjoy. He comes out sooner when no one is waiting at the cave door." },
      { p: "It's no big deal.", heard: "You're overreacting. What bothers you doesn't matter.", means: "I can fix this. Please don't dwell on it.", helps: "Let him get on with fixing it." },
      { p: "No problem.", heard: "Why are you making a fuss about asking?", means: "I'm happy to do this for you.", helps: "Take the yes. (Gray himself switched to saying 'I'd be happy to'.)" },
      { p: "...", heard: "You're not worth answering.", means: "I'm still working out what to say.", helps: "Wait. Filling the silence with more questions resets his thinking." }
    ]
  };

  (function translator() {
    const root = $("[data-component=translator]");
    const box = $(".phrases", root);
    const dirBtns = $$(".dir button", root);
    let dir = "venus";
    function render() {
      root.dataset.dir = dir;
      box.innerHTML = "";
      PHRASES[dir].forEach((item, i) => {
        const b = el("button", { class: "phrase", type: "button", "aria-pressed": "false" }, item.p === "..." ? "(silence)" : item.p);
        if (item.p === "...") b.classList.add("silence");
        b.addEventListener("click", () => show(i));
        box.appendChild(b);
      });
      show(0);
    }
    function show(i) {
      $$(".phrase", box).forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
      const it = PHRASES[dir][i];
      $(".r-heard", root).textContent = it.heard;
      $(".r-means", root).textContent = it.means;
      $(".r-helps", root).textContent = it.helps;
    }
    dirBtns.forEach((b) => b.addEventListener("click", () => {
      dir = b.dataset.dir;
      dirBtns.forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      render();
    }));
    render();
  })();

  /* ---------------- Points counter ---------------- */
  const GIFTS = [
    { g: "Paid off the credit card", big: true },
    { g: "Booked a holiday abroad", big: true },
    { g: "Worked late for a bonus", big: true },
    { g: "Hug on getting home", big: false },
    { g: "Asked how her appointment went", big: false },
    { g: "Called to say he'd be late", big: false },
    { g: "Brought her a single flower", big: false },
    { g: "Made her a cup of tea", big: false },
    { g: "Put the phone down to listen", big: false },
    { g: "Took the bins out unasked", big: false }
  ];
  (function score() {
    const root = $("[data-component=score]");
    const box = $(".gifts", root);
    const counts = GIFTS.map(() => 0);
    GIFTS.forEach((d, i) => {
      const b = el("button", { class: "gift" + (d.big ? " big" : ""), type: "button" },
        `<span>${d.g}</span><span class="size">${d.big ? "big" : "small"}</span><span class="ct" aria-label="times added">0</span>`);
      b.addEventListener("click", () => { counts[i]++; update(); });
      box.appendChild(b);
    });
    function update() {
      let mars = 0, venus = 0, bigN = 0, smallN = 0;
      counts.forEach((c, i) => {
        mars += c * (GIFTS[i].big ? 30 : 1);
        venus += c;
        if (GIFTS[i].big) bigN += c; else smallN += c;
      });
      $$(".gift .ct", box).forEach((s, i) => (s.textContent = counts[i]));
      $("#score-mars").textContent = mars;
      $("#score-venus").textContent = venus;
      const max = Math.max(mars, venus, 30);
      $("#bar-mars").style.width = (mars / max) * 100 + "%";
      $("#bar-venus").style.width = (venus / max) * 100 + "%";
      let msg;
      if (!bigN && !smallN) msg = "Tap a gesture to begin.";
      else if (bigN && !smallN) msg = `He's at ${mars} and feels he's more than done his share. She's at ${venus}. To her each big gesture is still just one point, and the late nights it took may even feel like less of him.`;
      else if (smallN && !bigN) msg = `${venus} points to her, and he barely noticed doing anything. Gray says this steady drip is what keeps her 'love tank' full.`;
      else if (smallN >= 2 * bigN) msg = `A good mix. The big things provide; the ${smallN} small ones are what she feels day to day.`;
      else msg = `He reckons ${mars}, she counts ${venus}. Gray's fix isn't more effort, just redirecting some of it into small, frequent things.`;
      $(".score-msg", root).textContent = msg;
    }
    $("#score-reset").addEventListener("click", () => { counts.fill(0); update(); });
  })();

  /* ---------------- Asking coach ---------------- */
  const ASKS = [
    { s: "The shopping is still in the car and your hands are full.",
      o: [
        { t: "\"The groceries are still in the car.\"", ok: false, f: "An indirect hint. Gray says he hears an expectation ('it's your job') rather than a request, and feels taken for granted." },
        { t: "\"Could you bring the groceries in? I've been out all afternoon, my back hurts and I still have to cook.\"", ok: false, f: "Two problems: 'could' asks whether he is able to, and the list of reasons makes it sound like he needs convincing." },
        { t: "\"Would you bring the groceries in?\"", ok: true, f: "Direct, brief, and a real request he can say yes to. Then a thank-you when he does." }
      ] },
    { s: "You'd like an evening out together this week.",
      o: [
        { t: "\"We haven't been out in weeks.\"", ok: false, f: "Sounds like a complaint about him, not an invitation. He hears 'you're neglecting me'." },
        { t: "\"Would you take me out for dinner this week?\"", ok: true, f: "Clear and warm. He knows exactly what would please you and gets the chance to be the good guy." },
        { t: "\"Do you want to go out sometime?\"", ok: false, f: "Too vague. It asks about his wishes rather than stating yours." }
      ] },
    { s: "Your daughter needs picking up from school and you're stuck at work.",
      o: [
        { t: "\"Julie needs picking up and I can't do it.\"", ok: false, f: "States a problem but never asks. He may hear a demand with an implied 'or else'." },
        { t: "\"Can you get Julie?\"", ok: false, f: "Close, but Gray argues 'can' questions his ability. Of course he can; the question is whether he will." },
        { t: "\"Would you pick Julie up from school today?\"", ok: true, f: "That's the one. 'Would' invites a choice, and a freely chosen yes is the one he remembers to follow through on." }
      ] },
    { s: "You want proper time to talk about the week ahead.",
      o: [
        { t: "\"We need to talk.\"", ok: false, f: "To a Martian this sounds like a summons. He hears 'it's your fault we don't talk'." },
        { t: "\"Why don't we ever talk anymore?\"", ok: false, f: "A rhetorical question carries disapproval, which is exactly what makes him defensive." },
        { t: "\"Would you sit down with me tonight and go over our week?\"", ok: true, f: "Specific about what and when, with no blame attached." }
      ] },
    { s: "The kitchen bin is overflowing.",
      o: [
        { t: "\"Would you empty the bin?\"", ok: true, f: "Short and direct. Gray's one timing caveat: don't ask if he is obviously about to do it anyway." },
        { t: "\"I can't fit anything else in this bin.\"", ok: false, f: "Indirect. He hears criticism ('you should have done this already')." },
        { t: "\"Could you possibly empty the bin when you get a minute, if it isn't too much trouble?\"", ok: false, f: "So padded it sounds unsure. Gray says this kind of hedging reads as mistrust or manipulation to a Martian." }
      ] }
  ];
  (function ask() {
    const root = $("[data-component=ask]");
    let i = 0, right = 0, answered = 0;
    function render() {
      const a = ASKS[i];
      $(".ask-scene", root).textContent = a.s;
      $(".ask-feedback", root).textContent = "";
      const box = $(".ask-options", root);
      box.innerHTML = "";
      a.o.forEach((o) => {
        const b = el("button", { class: "opt", type: "button" }, o.t);
        b.addEventListener("click", () => {
          answered++;
          if (o.ok) right++;
          $$(".opt", box).forEach((x, k) => {
            x.disabled = true;
            if (a.o[k].ok) x.classList.add("right");
          });
          if (!o.ok) b.classList.add("wrong");
          $(".ask-feedback", root).textContent = (o.ok ? "Yes. " : "Not quite. ") + o.f;
          count();
        });
        box.appendChild(b);
      });
      count();
    }
    function count() {
      $(".ask-count", root).textContent = `Situation ${i + 1} of ${ASKS.length}` + (answered ? `. ${right} of ${answered} right so far.` : "");
    }
    $("#ask-next").addEventListener("click", () => {
      i = (i + 1) % ASKS.length;
      if (i === 0) { right = 0; answered = 0; }
      render();
    });
    render();
  })();

  /* ---------------- Anatomy of a fight ---------------- */
  const STEPS = [
    { who: "She", t: "Gets upset about something. On a picnic, he mentions he might put part of their savings into risky shares, and she's alarmed he'd decide without her." },
    { who: "He", t: "Explains why she shouldn't be upset, by defending the investment on its merits." },
    { who: "She", t: "Feels dismissed and gets more upset. Now she's upset about being dismissed more than about the shares." },
    { who: "He", t: "Feels her disapproval, gets angry with her for being angry with him, and wants an apology before he'll make up." },
    { who: "She", t: "Either apologises and wonders what just happened, or digs in and it becomes a battle." },
    { who: "The fix", t: "Cut the loop at step 2. He listens, works out how he upset her, and says \"I'm sorry I upset you when I said that.\" If a real apology sticks in his throat, \"I'm sorry you're so upset\" still says I care. She can help by naming the feeling directly instead of firing a rhetorical question.", fix: true }
  ];
  (function argue() {
    const root = $("[data-component=argue]");
    const list = $(".steps", root);
    let at = 0;
    STEPS.forEach((s) => list.appendChild(el("li", { class: "step" + (s.fix ? " fixstep" : "") }, `<p><span class="who">${s.who}</span>${s.t}</p>`)));
    const items = $$(".step", list);
    function render() {
      items.forEach((it, k) => {
        it.classList.toggle("seen", k <= at);
        it.classList.toggle("current", k === at && !STEPS[k].fix);
        it.classList.toggle("fix", k === at && STEPS[k].fix);
        it.setAttribute("aria-current", k === at ? "step" : "false");
      });
      $("#argue-prev").disabled = at === 0;
      const nxt = $("#argue-next");
      nxt.textContent = at === STEPS.length - 1 ? "Start over" : at === STEPS.length - 2 ? "Show the fix" : "Next step";
    }
    $("#argue-next").addEventListener("click", () => { at = at === STEPS.length - 1 ? 0 : at + 1; render(); });
    $("#argue-prev").addEventListener("click", () => { if (at > 0) at--; render(); });
    render();
  })();

  /* ---------------- Love Letter ---------------- */
  const LSECTIONS = [
    { k: "anger", name: "Anger", lead: "I don't like it when... I'm angry that... I'm frustrated that...", ph: "I'm angry that you..." },
    { k: "sadness", name: "Sadness", lead: "I'm sad that... I feel hurt that... I wanted...", ph: "I feel hurt that..." },
    { k: "fear", name: "Fear", lead: "I'm afraid that... I worry that... I need...", ph: "I'm afraid that..." },
    { k: "regret", name: "Regret", lead: "I'm sorry that... I feel embarrassed that... I didn't mean to...", ph: "I'm sorry that I..." },
    { k: "love", name: "Love", lead: "I love... I understand... I appreciate... I forgive... I want...", ph: "I love you and I understand that..." }
  ];
  (function letter() {
    const form = $("[data-component=letter]");
    const box = $(".lsections", form);
    LSECTIONS.forEach((s) => {
      const lab = el("label", { class: "lsec", "data-k": s.k },
        `<span>${s.name}</span><small>${s.lead}</small><textarea name="${s.k}" rows="2" placeholder="${s.ph}"></textarea>`);
      box.appendChild(lab);
    });
    const out = $(".letter-out", form);
    $("#letter-build").addEventListener("click", () => {
      const f = new FormData(form);
      const to = (f.get("to") || "").trim() || "you";
      const from = (f.get("from") || "").trim() || "me";
      const parts = LSECTIONS.map((s) => (f.get(s.k) || "").trim()).filter(Boolean);
      const ps = (f.get("ps") || "").trim();
      const missing = LSECTIONS.filter((s) => !(f.get(s.k) || "").trim()).map((s) => s.name.toLowerCase());
      let txt = `Dear ${to},\n\nI'm writing this to share my feelings with you.\n\n${parts.join("\n\n")}\n\nLove,\n${from}`;
      if (ps) txt += `\n\nP.S. The response I would like to hear: ${ps}`;
      if (!parts.length) txt = "Write at least one section first. Gray's advice: keep going until you reach the love.";
      else if (missing.length) txt += `\n\n(Gray would say keep going: you skipped ${missing.join(", ")}.)`;
      $("#letter-text").textContent = txt;
      out.hidden = false;
      $(".copy-msg", form).textContent = "";
    });
    $("#letter-clear").addEventListener("click", () => { form.reset(); out.hidden = true; });
    $("#letter-copy").addEventListener("click", async () => {
      const t = $("#letter-text").textContent;
      try { await navigator.clipboard.writeText(t); $(".copy-msg", form).textContent = "Copied."; }
      catch (e) { $(".copy-msg", form).textContent = "Copy failed. Select the text and copy it by hand."; }
    });
  })();

  /* ---------------- Seasons ---------------- */
  const SEASONS = [
    { n: "Spring", b: "Falling in love. Everything is effortless, your partner seems a perfect fit, and you can't imagine it ever being otherwise.", t: "<strong>The job:</strong> enjoy it, without mistaking it for how love will always feel." },
    { n: "Summer", b: "The flaws show. Your partner is not only from another planet but also a fallible human. Love now takes work under a hot sun, and many couples quit here because they expected permanent spring.", t: "<strong>The job:</strong> tend the garden. Meet your partner's needs and ask for your own." },
    { n: "Autumn", b: "The harvest. A more mature love that accepts imperfection, yours and theirs. A time to share and be grateful.", t: "<strong>The job:</strong> enjoy what you built, and keep watering it." },
    { n: "Winter", b: "Old pain comes up. Men hole up in caves, women sink into wells, and each has to do some solitary healing. It's the darkest stretch, and it passes.", t: "<strong>The job:</strong> look to yourself, friends or a therapist rather than expecting your partner to fix it. Spring comes back." }
  ];
  (function seasons() {
    const root = $("[data-component=seasons]");
    const wheel = $(".wheel", root);
    const tabs = SEASONS.map((s, i) => {
      const b = el("button", { class: "sbtn", role: "tab", type: "button", "data-s": String(i) }, s.n);
      b.addEventListener("click", () => pick(i));
      wheel.appendChild(b);
      return b;
    });
    function pick(i) {
      selectTab(tabs, i);
      $(".s-name", root).textContent = SEASONS[i].n;
      $(".s-body", root).textContent = SEASONS[i].b;
      $(".s-task", root).innerHTML = SEASONS[i].t;
    }
    keyTabs(wheel, pick);
    pick(0);
  })();

  /* ---------------- Quiz ---------------- */
  const QUIZ = [
    { q: "She comes home and says her boss has dumped another project on her and she's drowning. What does Gray want him to say?",
      o: ["\"Just tell him no. Or start looking for another job.\"", "\"Sounds like a brutal day. What happened?\"", "\"Everyone has weeks like that, it'll pass.\""], a: 1,
      e: "Solutions and reassurance both skip her feelings. Listening is the support; she'll usually find her own way to a solution once she feels heard." },
    { q: "He gets home quiet and, when asked, says \"I'm fine.\" What does Gray suggest she does?",
      o: ["Keep gently asking until he opens up.", "Tell him his silence is hurting her.", "Leave him be and do something she enjoys."], a: 2,
      e: "He's in his cave. Questions and worry keep him there longer; her being happy and unworried helps him come out sooner." },
    { q: "He's clearly lost while driving to a party. What scores most with him?",
      o: ["Saying nothing and trusting him to find the way.", "Suggesting he pull over and ask someone.", "Opening the map on her phone and reading out directions."], a: 0,
      e: "Gray puts this among the moments a man values most: getting there without help, and without an 'I told you so'." },
    { q: "Per Gray's scoring, which matters more to her over a month?",
      o: ["A pay rise that doubles the household income.", "A steady stream of small daily gestures.", "One expensive surprise weekend away."], a: 1,
      e: "Every gesture scores one point with her regardless of size, so frequency beats scale." },
    { q: "She'd like help with the washing-up tonight. Which request does Gray recommend?",
      o: ["\"Could you help with the dishes?\"", "\"The dishes are really piling up.\"", "\"Would you do the dishes tonight?\""], a: 2,
      e: "Direct, brief, and 'would' rather than 'could'. If he says no, Gray's stage two is to accept that graciously." },
    { q: "After two lovely, close weeks he wants a night of TV alone and she feels hurt. What should he say?",
      o: ["\"I've been great for two weeks. Surely I've earned one night off.\"", "\"I can see you're hurt. I need to unwind tonight, and I'd like to talk tomorrow.\"", "Nothing. Turn the TV off and stay with her, even though he's frazzled."], a: 1,
      e: "His need for space is valid and so is her hurt. Arguing for his rights invalidates her; forcing himself to listen when he can't usually blows up later." }
  ];
  (function quiz() {
    const root = $("[data-component=quiz]");
    let i = 0, score = 0;
    function render() {
      const item = QUIZ[i];
      $(".q-count", root).textContent = `Question ${i + 1} of ${QUIZ.length}`;
      $(".q-text", root).textContent = item.q;
      $(".q-explain", root).textContent = "";
      $(".q-progress span", root).style.width = (i / QUIZ.length) * 100 + "%";
      $("#q-next").hidden = true;
      const box = $(".q-options", root);
      box.innerHTML = "";
      item.o.forEach((t, k) => {
        const b = el("button", { class: "opt", type: "button" }, t);
        b.addEventListener("click", () => {
          if (k === item.a) score++;
          $$(".opt", box).forEach((x, n) => { x.disabled = true; if (n === item.a) x.classList.add("right"); });
          if (k !== item.a) b.classList.add("wrong");
          $(".q-explain", root).textContent = (k === item.a ? "Right. " : "Not what Gray would say. ") + item.e;
          const nb = $("#q-next");
          nb.textContent = i === QUIZ.length - 1 ? "See your score" : "Next question";
          nb.hidden = false;
          nb.focus();
        });
        box.appendChild(b);
      });
    }
    $("#q-next").addEventListener("click", () => {
      i++;
      if (i < QUIZ.length) { render(); return; }
      $(".q-progress span", root).style.width = "100%";
      ["q-count", "q-text", "q-options", "q-explain"].forEach((c) => ($("." + c, root).hidden = true));
      $("#q-next").hidden = true;
      const done = $(".q-done", root);
      done.hidden = false;
      const verdict = score === QUIZ.length ? "You could teach the seminar." : score >= 4 ? "You've got the gist of the book." : "Gray would send you back to chapter 2.";
      $(".q-score", root).textContent = `${score} of ${QUIZ.length}. ${verdict}`;
      $("#q-restart").focus();
    });
    $("#q-restart").addEventListener("click", () => {
      i = 0; score = 0;
      ["q-count", "q-text", "q-options", "q-explain"].forEach((c) => ($("." + c, root).hidden = false));
      $(".q-done", root).hidden = true;
      render();
    });
    render();
  })();

  /* ---------------- Overlap visualiser ---------------- */
  (function overlap() {
    const slider = $("#d-slider");
    if (!slider) return;
    const W = 640, base = 210, top = 24, x0 = 20, x1 = 620;
    const pdf = (x, m) => Math.exp(-0.5 * (x - m) * (x - m)) / Math.sqrt(2 * Math.PI);
    const peak = pdf(0, 0);
    // erf approximation (Abramowitz & Stegun 7.1.26)
    function erf(x) {
      const s = Math.sign(x); x = Math.abs(x);
      const t = 1 / (1 + 0.3275911 * x);
      const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
      return s * y;
    }
    const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
    const lo = -4, hi = 6.5;
    const sx = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
    const sy = (p) => base - (p / peak) * (base - top);
    function path(fn) {
      let d = `M ${sx(lo)} ${base}`;
      for (let i = 0; i <= 220; i++) {
        const v = lo + (i / 220) * (hi - lo);
        d += ` L ${sx(v).toFixed(1)} ${sy(fn(v)).toFixed(1)}`;
      }
      return d + ` L ${sx(hi)} ${base} Z`;
    }
    const BANDS = [
      { max: 0.10, name: "close to zero", note: "Differences this size are invisible in everyday life. You could not guess someone's sex from the trait." },
      { max: 0.35, name: "small", note: "Hyde found close to half the effects she reviewed landed in this range. Most of the people in each group could swap places unnoticed." },
      { max: 0.65, name: "moderate", note: "A real average gap, but the groups still overlap far more than they differ. Plenty of individuals sit on the 'wrong' side." },
      { max: 1.00, name: "large", note: "Noticeable at the group level. Even here, many individuals are more like the other group than their own." },
      { max: 99, name: "very large", note: "Rare for psychological traits. In Hyde's review the marked differences were in things like throwing distance, some aspects of sexuality and physical aggression, not in communication or emotional needs." }
    ];
    // Centre the pair so the picture stays balanced
    function draw(d) {
      const ma = 1.25 - d / 2, mb = 1.25 + d / 2;
      $("#curve-a").setAttribute("d", path((v) => pdf(v, ma)));
      $("#curve-b").setAttribute("d", path((v) => pdf(v, mb)));
      $("#curve-ov").setAttribute("d", path((v) => Math.min(pdf(v, ma), pdf(v, mb))));
      const ovl = 2 * Phi(-d / 2);
      $("#d-out").textContent = d.toFixed(2);
      $("#ov-pct").textContent = Math.round(ovl * 100) + "%";
      const band = BANDS.find((b) => d <= b.max);
      $("#ov-band").textContent = band.name;
      $("#ov-note").textContent = band.note;
    }
    slider.addEventListener("input", () => draw(parseFloat(slider.value)));
    draw(parseFloat(slider.value));
  })();

  /* ---------------- Nav highlight ---------------- */
  (function nav() {
    const links = $$(".topnav ul a");
    if (!("IntersectionObserver" in window)) return;
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          const a = map.get(en.target.id);
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  })();
})();
