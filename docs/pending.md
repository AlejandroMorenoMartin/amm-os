# AMM-OS — Pendientes

## App

- **React Router — migración de router interno** — habilita URLs reales por página y proyecto (`/trabajo/amm-os`), botón atrás del browser, deep linking y botón de compartir. Prerequisito para shareability real del portfolio.

- **Navegación vertical ↑ ↓** entre elementos focusables — hook en `useArcadeControls.ts`, función `getFocusables()` ya existe
- **SistemaPage** — código completo pero muteado en `App.tsx`. No borrar, se retomará.
- **Auditoría tipográfica** — CVPage puede usar tokens incorrectos, verificar consistencia al retomar
- **Contraste zinc-500 a 10px** — decisión pendiente de revisión visual

## Infraestructura

- Rama `dev` en Vercel con dominio de preview — pendiente configurar
- Google Search Console — configurar tras transferencia de dominio
- Hotjar — conectar en producción
