# Mars & Venus, decoded

An interactive reader's guide to John Gray's *Men Are from Mars, Women Are from Venus* (1992): the key ideas chapter by chapter, five hands-on tools (phrase translator, points counter, asking coach, anatomy of a fight, Love Letter builder), a short quiz, and a closing section on what the research says about psychological sex differences.

All book content is summarised and paraphrased. This is an independent study guide, not affiliated with the author or publisher.

## Run locally

It's a static site with no build step. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy on Vercel

1. Import this repository in Vercel.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy.

## Structure

```
index.html      page markup
css/style.css   styles
js/app.js       content data and interactions
fonts/          self-hosted Gloock and Figtree (SIL Open Font License)
```

## Credits

- Fonts: [Gloock](https://fonts.google.com/specimen/Gloock) and [Figtree](https://fonts.google.com/specimen/Figtree), both under the SIL Open Font License 1.1.
- Evidence section draws on Hyde (2005), *American Psychologist*; Carothers & Reis (2013), *Journal of Personality and Social Psychology*; and the Gottman Institute on flooding.
