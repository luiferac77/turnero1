# 📅 Sistema de Turnero

Una aplicación web moderna para gestionar y reservar turnos de forma fácil y rápida.

## ✨ Características

- ✅ **Reservar turnos** - Formulario intuitivo para reservas
- 📋 **Gestionar turnos** - Ver y cancelar tus turnos
- 📅 **Calendario interactivo** - Selecciona fechas disponibles
- ⏰ **Horarios dinámicos** - Horarios actualizados según disponibilidad
- 🎨 **Diseño moderno** - Interfaz responsive con Tailwind CSS
- 🌓 **Modo oscuro** - Soporte para tema claro y oscuro
- ⚡ **Rápido** - Construido con Next.js 16 y React 19

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/luiferac77/turnero1.git
cd turnero1

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Uso

### Reservar un Turno
1. Ve a la pestaña "Reservar Turno"
2. Completa el formulario con tus datos:
   - Nombre completo
   - Email
   - Teléfono
   - Servicio deseado
   - Fecha (hasta 30 días adelante)
   - Hora disponible
3. Haz clic en "Reservar Turno"

### Ver Mis Turnos
1. Ve a la pestaña "Mis Turnos"
2. Ingresa tu email
3. Haz clic en "Buscar"
4. Verás todos tus turnos activos
5. Puedes cancelar un turno si es necesario

## 🏗️ Estructura del Proyecto

```
turnero1/
├── app/
│   ├── api/
│   │   └── turnos/
│   │       ├── route.ts              # GET/POST turnos
│   │       ├── horarios/route.ts     # GET horarios disponibles
│   │       └── [id]/route.ts         # GET/DELETE turno específico
│   ├── page.tsx                      # Página principal
│   ├── layout.tsx                    # Layout raíz
│   └── globals.css                   # Estilos globales
├── components/
│   ├── FormularioReserva.tsx         # Formulario de reserva
│   └── MisTurnos.tsx                 # Vista de mis turnos
├── lib/
│   └── turnos.ts                     # Lógica de turnos
├── types/
│   └── turno.ts                      # Tipos TypeScript
├── package.json
└── tsconfig.json
```

## 📊 Servicios Disponibles

- Corte de cabello
- Afeitado
- Cuidado de barba
- Coloración
- Tratamiento capilar

## ⏳ Horarios

**Mañana:** 09:00 - 11:30  
**Tarde:** 14:00 - 17:00  
**Intervalo:** 30 minutos  
**Máximo 3 turnos por horario**

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, Next.js 16
- **Styling:** Tailwind CSS 4
- **Lenguaje:** TypeScript 5
- **Linting:** ESLint 9

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm start        # Inicia servidor de producción
npm run lint     # Ejecuta linting
```

## 🔐 Almacenamiento de Datos

Actualmente, la aplicación almacena turnos en memoria. Para una aplicación de producción, se recomienda usar una base de datos como:
- PostgreSQL
- MongoDB
- Firebase

## 🚀 Deployment

La aplicación está lista para ser desplegada en:
- Vercel (recomendado)
- Netlify
- AWS
- Otros servidores Node.js

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
