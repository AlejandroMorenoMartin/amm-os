# AMM-OS — Referencia de proyecto

Portfolio web de Alejandro Moreno Martín. SPA estilo terminal/OS.
Stack: React + TypeScript + Vite + Tailwind CSS v4.

## Archivos clave

- `src/styles/index.css` — fuente de verdad: tokens, clases, breakpoints
- `src/i18n/es.ts` / `en.ts` — fuente de verdad: todo el texto
- `src/store/useAppStore.ts` — router interno + estado global
- `src/hooks/useArcadeControls.ts` — navegación por teclado (← → OK, ↑ ↓ pendiente)
- `apps/amm-os/docs/design-references/` — capturas Figma (consultar antes de implementar)

## Regla de oro: Foundations First

Cero valores hardcodeados en componentes:
- Texto → i18n files
- Colores, bordes, tamaños → variables CSS en `index.css`
- Componentes solo usan `className` con clases definidas en el CSS

Excepción permitida: `style={{ gridTemplateColumns }}` y propiedades de layout no tokenizables.

Al terminar cualquier bloque: revisar strings, colores o tamaños hardcodeados y migrarlos antes de cerrar.

## Breakpoint

Un único breakpoint: **768px**.
```
@media (min-width: 768px) and (min-height: 500px)
```
Clases custom: `.desktop-block`, `.desktop-inline`.
**Nunca usar `sm:`, `md:`, `lg:` de Tailwind** — todo breakpoint va en CSS manual.

## Sistema de focus

Dos reglas globales en `index.css`, nunca por componente:
- **Texto y botones:** `border-bottom: 0.5px solid var(--color-azul-500)` + `>` via `::before`
- **Imágenes** (`photo-btn`, modals): `border completo: 0.5px solid var(--color-azul-500)`, sin `>`

## i18n

Toda cadena de texto va en `es.ts` / `en.ts`. Hardcodear está bien para explorar — migrar antes de cerrar la tarea.

## Convenciones visuales

- Valores numéricos de KPI: siempre `--color-naranja-500` (`#F97316`). Se aplica inline o via clase `.kpi` definida en `index.css`.

## Voz y tono del copy

Primera persona, tranquilo y directo. Nunca declarativo ni grandilocuente.
- Tono conversacional, resultados y oportunidades, frases cortas
- Prohibido: "Lo que más me importa", "Mi valor reside en", "donde quiero estar"

@apps/amm-os/docs/typography.md
@apps/amm-os/docs/design-references/
@apps/amm-os/docs/pending.md
@apps/amm-os/docs/done.md
