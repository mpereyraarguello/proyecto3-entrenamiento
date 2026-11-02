# Convenciones de Desarrollo - NombreGYM

## Paleta de Colores
| Color | Hex | Uso |
|---|---|---|
| Fondo / Dark mode | `#121212` | Fondo general y dark mode |
| Gris Oscuro | `#1E1E1E` | Tarjetas, contenedores y barras |
| Verde Neón | `#00FF00` | Botones de acción principal, acentos y progreso |
| Blanco | `#FFFFFF` | Texto principal, títulos y lectura |
| Gris Verdoso | `#6E8B7E` | Textos secundarios, bordes e iconos neutros |
| Rojo Bordó | `#8B0000` | Errores, alertas de cancelación y avisos críticos |

## Tipografía
- **Coolvetica** (ya cargada como `@font-face` en `index.css`) — Fuente principal por defecto.
- **Montserrat Bold** — Títulos y encabezados.
- **Impact** — Acentos visuales.
- **Arial Black** — Alternativa de peso.

## Convenciones de Pantallas
- Cada pantalla **DEBE** tener:
  1. Un **título grande** alusivo a la pantalla.
  2. Un **subtítulo** descriptivo de lo que se realiza.
  3. Un **icono SVG** alusivo a la pantalla (NO emojis).

## Convenciones de Botones
- Usar palabras claras: **"Guardar"**, **"Cancelar"**, **"Iniciar"**, **"Finalizar"**.
- **NO incluir emojis** en los botones.
- **Utilizar iconos SVG** inline cuando sea necesario.

## Estructura de Carpetas (Frontend)
```
pages/
  vista-profesor/ (o vista-alumno/)
    gestionar-alumno/
      components-comunes/      → Componentes compartidos del módulo
      crear-alumno/
        components/            → Componentes específicos de la pantalla
        services/              → Servicios API de la pantalla (ej: alumnoApi.ts)
      modificar-alumno/
        components/
        services/
      consultar-alumno/
        components/
        services/
      consultar-alumnos/
        components/
        services/
  components/                  → Componentes compartidos globales
  services/                    → Servicios globales (auth, HTTP config)
  types/                       → Tipos e interfaces compartidos
  routes/                      → Configuración de rutas
```

## Servicios
- **NO utilizar un único service para todo.**
- Cada pantalla/feature tiene su propio archivo de servicio dentro de su carpeta `services/`.
