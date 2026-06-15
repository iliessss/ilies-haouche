## What is Tawqit?

**Tawqit** is a mobile and web application that computes **prayer times** for any
location on Earth. Rather than relying on pre-computed tables, the app
**computes the Sun's position** in real time from the date, time and geographic
coordinates.

## The astronomical principle

Prayer times are defined by the **altitude of the Sun** in the sky. We therefore
need to know, at any instant, where the Sun is — which comes down to a few
astronomical quantities.

### Solar declination

The **declination** $\delta$ is the Sun's "latitude". It varies over the year and
is approximated by:

$$
\delta \approx 23.44^\circ \times \sin\!\left(\frac{360}{365}\,(N - 81)\right)
$$

where $N$ is the day number in the year.

### Hour angle

For a given solar altitude $h$, the **hour angle** $H$ (the angle between the Sun
and the local meridian) follows from the latitude $\varphi$:

$$
\cos H = \frac{\sin h - \sin\varphi \, \sin\delta}{\cos\varphi \, \cos\delta}
$$

The time of the event is then obtained from $H$, the **equation of time** and the
local solar noon.

## An angle for each prayer

Each prayer corresponds to a specific solar altitude $h$:

| Prayer   | Definition                                   |
| -------- | -------------------------------------------- |
| Fajr     | Sun at $-18^\circ$ (depending on convention) |
| Dhuhr    | Sun crossing the meridian (solar noon)       |
| Asr      | Shadow length = object height (+1)           |
| Maghrib  | Sunset ($h \approx -0.83^\circ$)             |
| Isha     | Sun at $-17^\circ$ / $-18^\circ$             |

Conventions (Fajr and Isha angles, Asr method) vary between organizations, so
Tawqit offers several selectable **calculation methods**.

## Under the hood

The app is built with **Flutter (Dart)**, allowing a single codebase for
**Android, iOS and the web**. The core computes the formulas above, and the
interface shows the times, a countdown to the next prayer, and settings (method,
manual adjustments, location).

*Available on the App Store and Google Play (links at the bottom of the page).*
