## Qu'est-ce que Tawqit ?

**Tawqit** est une application (mobile et web) qui calcule les **heures de prière**
pour n'importe quel lieu sur Terre. Plutôt que de s'appuyer sur des tables
pré-calculées, l'application **calcule la position du Soleil** en temps réel à
partir de la date, de l'heure et des coordonnées géographiques.

## Le principe astronomique

Les heures de prière sont définies par la **hauteur du Soleil** dans le ciel. Il
faut donc savoir, à chaque instant, où se trouve le Soleil. Cela passe par
quelques grandeurs astronomiques.

### Déclinaison solaire

La **déclinaison** $\delta$ est la « latitude » du Soleil. Elle varie au cours de
l'année et s'approche par :

$$
\delta \approx 23.44^\circ \times \sin\!\left(\frac{360}{365}\,(N - 81)\right)
$$

où $N$ est le numéro du jour dans l'année.

### Angle horaire

Pour une hauteur solaire donnée $h$, l'**angle horaire** $H$ (l'angle entre le
Soleil et le méridien local) se déduit de la latitude $\varphi$ par :

$$
\cos H = \frac{\sin h - \sin\varphi \, \sin\delta}{\cos\varphi \, \cos\delta}
$$

L'heure de l'événement s'obtient alors à partir de $H$, de l'**équation du temps**
et du midi solaire local.

## Des angles pour chaque prière

Chaque prière correspond à une hauteur solaire $h$ particulière :

| Prière   | Définition                                  |
| -------- | ------------------------------------------- |
| Fajr     | Soleil à $-18^\circ$ (selon la convention)  |
| Dhuhr    | Passage du Soleil au méridien (midi solaire)|
| Asr      | Longueur d'ombre = hauteur de l'objet (+1)  |
| Maghrib  | Coucher du Soleil ($h \approx -0.83^\circ$) |
| Isha     | Soleil à $-17^\circ$ / $-18^\circ$          |

Les conventions (angles de Fajr et Isha, méthode pour Asr) varient selon les
organismes ; Tawqit propose donc plusieurs **méthodes de calcul** au choix.

## Côté technique

L'application est développée en **Flutter (Dart)**, ce qui permet une seule base
de code pour **Android, iOS et le web**. Le cœur de calcul implémente les
formules ci-dessus, puis l'interface affiche les horaires, le compte à rebours
vers la prochaine prière et les réglages (méthode, ajustements manuels, lieu).

*Téléchargeable sur l'App Store et Google Play (liens en bas de page).*
