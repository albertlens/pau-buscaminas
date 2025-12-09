# 💣 Buscaminas Moderno

Una versión moderna e interactiva del clásico juego Buscaminas, construido con React, TypeScript, Vite y Tailwind CSS.

## ✨ Características

- 🎮 **Tres niveles de dificultad**: Fácil (9x9), Medio (16x16), Difícil (16x30)
- 🌓 **Modo oscuro/claro**: Cambia entre temas con un solo clic
- 🎨 **Diseño moderno**: Interfaz atractiva con gradientes y animaciones
- ⏱️ **Temporizador**: Rastrea tu tiempo de juego
- 🚩 **Contador de banderas**: Marca las minas sospechosas
- 🎉 **Efectos visuales**: Confetti al ganar, animaciones suaves
- 📱 **Responsive**: Funciona en dispositivos móviles y desktop

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 20.19+ o 22.12+
- npm

### Instalación

```bash
# Navegar al directorio del proyecto
cd minesweeper-modern

# Instalar dependencias (si no se instalaron automáticamente)
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El juego estará disponible en `http://localhost:5173`

## 🎯 Cómo Jugar

1. **Selecciona la dificultad**: Elige entre Fácil, Medio o Difícil
2. **Click izquierdo**: Revela una celda
3. **Click derecho**: Marca/desmarca una bandera 🚩
4. **Objetivo**: Revelar todas las celdas que no contienen minas
5. **Números**: Indican cuántas minas hay en las 8 celdas adyacentes

## 🛠️ Tecnologías Utilizadas

- **React 18**: Librería UI moderna
- **TypeScript**: Tipado estático para código robusto
- **Vite**: Build tool ultrarrápido
- **Tailwind CSS**: Framework de utilidades CSS
- **React Hooks**: useState, useEffect, useCallback, useMemo

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Board.tsx       # Tablero de juego
│   ├── Cell.tsx        # Celda individual
│   ├── GameHeader.tsx  # Encabezado con stats
│   ├── DifficultySelect.tsx  # Selector de dificultad
│   ├── ThemeToggle.tsx # Toggle de tema
│   ├── Confetti.tsx    # Efecto de confetti
│   └── GameOverModal.tsx # Modal de fin de juego
├── hooks/              # Custom hooks
│   └── useGame.ts      # Lógica principal del juego
├── types/              # Definiciones TypeScript
│   └── game.ts         # Tipos del juego
├── utils/              # Utilidades
│   └── gameLogic.ts    # Lógica del buscaminas
├── App.tsx             # Componente principal
└── index.css           # Estilos globales
```

## 🎨 Características de Diseño

- **Gradientes vibrantes**: Interfaz moderna con gradientes de colores
- **Animaciones fluidas**: Transiciones suaves en hover y clicks
- **Modo oscuro automático**: Detecta preferencias del sistema
- **Efectos de partículas**: Celebración visual al ganar
- **Responsive design**: Adaptable a cualquier tamaño de pantalla

## 🔧 Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar linter
```

## 📝 Mejoras Futuras

- [ ] Tabla de mejores tiempos
- [ ] Configuración personalizada de tablero
- [ ] Efectos de sonido
- [ ] Modo multijugador
- [ ] Diferentes temas visuales
- [ ] Sistema de logros

## 📄 Licencia

MIT

---

¡Disfruta del juego! 🎮💣

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
