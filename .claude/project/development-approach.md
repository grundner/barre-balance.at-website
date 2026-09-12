# Development Approach

Project-local working conventions. Architecture and technology decisions are
owned by [`docs/architecture/overview.md`](../../docs/architecture/overview.md)
and the ADRs in [`docs/adr/`](../../docs/adr/README.md).

## Tooling and roles

- **AI-driven development.**
- **Claude Design** is used for UX/UI and visual exploration and is the source of
  the design system (see [design-system.md](design-system.md) and
  [`docs/ux/design-process.md`](../../docs/ux/design-process.md)).
- **Claude Code** is used for implementation, content maintenance and documentation.
- Content is maintained through Git (Claude Code or pull requests); there is no CMS.

## Documentation

- Development is documentation-driven as defined in [`CLAUDE.md`](../../CLAUDE.md).
- Authoritative project knowledge lives under [`docs/`](../../docs/README.md);
  its status markers (Akzeptiert, Vorschlag, Hypothese, Kandidat, Offen) decide
  what may drive implementation.
- Project documentation and website content are written in German; working
  instructions under `.claude/` are written in English.
- The repository is public (ADR-0002): keep confidential information out.
